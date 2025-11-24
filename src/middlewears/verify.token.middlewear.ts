import { NextFunction, Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createError from "../utils/createError";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user_info?: any;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader)
    return next(createError(401, "Token missing.Please Login again."));
  const tokenArray = authorizationHeader.split(" ");
  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    return next(createError(401, "Invalid Token, Please login Again."));
  }
  const token = tokenArray[1];
  if (!token)
    return next(createError(401, "Access denied. No token provided."));
  try {
    req.token = token;
    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (err: any, user: any) => {
        if (err) {
          return next(createError(401, "Token is not Valid"));
        }
        req.user_info = user;
        next();
      }
    );
  } catch (err) {
    return next(createError(401, "Token Error!"));
  }
};

export const verifyUser: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("token verify");
  
  verifyToken(req, res, (err?: any) => {
    if (err) {
      return next(err);
    }
    if (req.user_info) {
      next();
    } else {
      return next(createError(403, "You are not authorized !"));
    }
  });
};
export const verifyAdmin: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, (err?: any) => {
    if (err) {
      return next(err);
    }
    console.log("user_info",req.user_info);
    
    if (req.user_info&&req.user_info.roal==="admin") {
      next();
    }
    else if(req.user_info&&req.user_info.roal==="user"){
      return next(createError(403, "Only Admin can create Common Data"));
  
    }
    
    else {
      return next(createError(403, "You are not authorized !"));
    }
  });
};
