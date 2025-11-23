import { NextFunction, Request, Response } from "express";
import Auth, { RegisterSchemaValidation } from "../Models/Auth.models";
import createError from "../utils/createError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";

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

    //201 → Created
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user: userResponse, accessToken, refreshToken },
          "User registered successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

export { register };
