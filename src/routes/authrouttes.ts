import express, { NextFunction, Request, Response } from "express";
import { login, register, updateUser } from "../controller/auth.controller";
import { uploadProfile } from "../middlewears/cloudinary.middlewear";
 
export const authRoute = express.Router();

authRoute.get("/", (req, res) => {
  res.send("API working");
});

authRoute.post("/login", login); 
authRoute.post("/register", register);

authRoute.patch("/update-profile/:id",  uploadProfile.single("profileImage"), updateUser);
