import { NextFunction, Request, Response } from "express";
import Auth, { RegisterSchemaValidation } from "../Models/Auth.models";
import createError from "../utils/createError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";

import { v2 as cloudinary } from "cloudinary";
// import { cloudinaryImage } from "../middlewears/cloudinary.middlewear";
const uploadToCloudinary = (fileBuffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ],
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

interface ExistingImages {
  imageUrl: string;
  imgPublicId: string;
}
/**
 * Generate Access Token
 * @param {Object} user - User object (Admin, user,)
 * @param {String} role - User role (e.g. "admin", "user")
 * @returns {string} JWT Token
 */

const generateAccessToken = (user: any, role: string): string => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  const expiry =
    (process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]) || "1d";

  return jwt.sign(
    {
      userId: user._id,
      role: role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: expiry || "1d" }
  );
};

/**
 * Generate Refresh Token
 * @param {Object} user - User object (Admin, Driver, etc.)
 * @param {String} role - User role
 * @returns {string} JWT Refresh Token
 */


const generateRefreshToken = (user: any, role: string): string => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  const expiry =
    (process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]) || "7d";

  return jwt.sign(
    {
      userId: user._id,
      role: role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: expiry }
  );
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = RegisterSchemaValidation.validate(req.body);
    if (error) {
      return next(createError(422, error.details[0].message)); //422 → Validation failed
    }

    const { email, phone } = value;

    const existingUser = await Auth.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return next(createError(409, "Email already registered."));
      }
      if (existingUser.phone === phone) {
        return next(createError(409, "Phone number already registered.")); //409 → Conflict
      }
    }

    const hashedPassword = await bcrypt.hash(value.password, 12);
    value.password = hashedPassword;

    const user = new Auth(value);
    const savedUser = await user.save();

    const { password, __v, ...userResponse } = savedUser.toObject();
    const accessToken = generateAccessToken(user, user.isAdmin);
    const refreshToken = generateRefreshToken(user, user.isAdmin);

    //200 → Created
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: userResponse, tokens:{accessToken, refreshToken} },
          "User registered successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};
const login=async(req: Request, res: Response, next: NextFunction)=>{
  try {

    const {email}=req.body


    if(!email){
        return next(createError(400, "Email is Required."));
    }
    if(!req.body.password){
        return next(createError(400, "Password is Required."));
    }

      const existingUser = await Auth.findOne({
    email 
    });

    if(!existingUser){
        return next(createError(404, "Email Doesn't exit."));
    }
    const isMatch=await bcrypt.compare(req.body.password,existingUser.password)

    if(!isMatch){
          return next(createError(404, "Email Doesn't exit."));
    }

      const accessToken = generateAccessToken(existingUser, existingUser.isAdmin);
    const refreshToken = generateRefreshToken(existingUser, existingUser.isAdmin);
   const { password, __v, ...userResponse } = existingUser.toObject();
 
  
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: userResponse,tokens:{ accessToken, refreshToken} },
          "User Logged in successfully"
        )
      );
  } catch (error) {
    next(error)
  }
}
 const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oldUser: any = await Auth.findById(req.params.id);

    if (!oldUser  ) {
      return next(createError(404, "User not found"));
    }

    // ---------------------------------------------------
    // IMAGE UPLOAD HANDLING
    // ---------------------------------------------------
    console.log("req.file",req.file);
    
    if (req.file) {
      console.log("New file received");

      // Upload new image to Cloudinary
      const uploaded: any = await uploadToCloudinary(
        req.file.buffer,
        "ProfileExpenceImage"
      );

      const newImage = {
        imageUrl: uploaded.secure_url,
        imgPublicId: uploaded.public_id,
      };

      // Delete old image if exists
      if (oldUser.profileImage?.imgPublicId) {
        try {
          const del = await cloudinary.uploader.destroy(oldUser.profileImage.imgPublicId);
          console.log("Old image deleted:", del);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }
console.log("newImage",newImage);

      req.body.profileImage = newImage;
    }

    // ---------------------------------------------------
    // PASSWORD UPDATE
    // ---------------------------------------------------
    if (req.body.password) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        oldUser.password
      );

      if (!isPasswordValid) {
        return next(createError(400, "Your previous password is incorrect"));
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // ---------------------------------------------------
    // UPDATE USER DATA
    // ---------------------------------------------------
    const user = await Auth.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    let accessToken
    let refreshToken
    if(user){

      accessToken  = generateAccessToken(user, user.isAdmin);
    refreshToken = generateRefreshToken(user, user.isAdmin);
    }

 res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: user, tokens:{accessToken, refreshToken} },
          "User Updated successfully"
        )
      );
  
  } catch (error) {
    console.log("updateUser error:", error);
    next(error);
  }
};
export { register,login,updateUser };
