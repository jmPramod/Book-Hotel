import express, { NextFunction, Request, Response } from "express"; 
  import { verifyUser } from "../middlewears/verify.token.middlewear";
import { getDashboardController } from "../controller/dashboard.controller";
 
export const dashboardRoutes = express.Router();
 
dashboardRoutes.get("/dashboard",verifyUser,getDashboardController)
 