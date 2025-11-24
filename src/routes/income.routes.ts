import express, { NextFunction, Request, Response } from "express"; 
import { addIncomeController, getIncomeController, deleteIncomeController, downloadExcelController } from "../controller/income.controller";
import { verifyUser } from "../middlewears/verify.token.middlewear";
 
export const incomeRoute = express.Router();
console.log("income route");

incomeRoute.post("/income",verifyUser,addIncomeController)

incomeRoute.get("/income",verifyUser,getIncomeController)

incomeRoute.get("/download-excel",verifyUser,downloadExcelController)
incomeRoute.delete("/income/:id",deleteIncomeController)