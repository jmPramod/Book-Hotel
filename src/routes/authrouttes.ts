import express, { NextFunction, Request, Response } from "express";
import { login, register } from "../controller/auth.controller";
 
export const authRoute = express.Router();

authRoute.get("/", (req, res) => {
  res.send("API working");
});

authRoute.post("/login", login); 
authRoute.post("/register", register);