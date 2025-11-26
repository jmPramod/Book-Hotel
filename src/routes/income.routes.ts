import express, { NextFunction, Request, Response } from "express"; 
import { addIncomeController, getIncomeController, deleteIncomeController, downloadExcelController, updateIncomeController } from "../controller/income.controller";
import { verifyUser } from "../middlewears/verify.token.middlewear";
 
export const incomeRoute = express.Router();
console.log("income route");

incomeRoute.post("/income",verifyUser,addIncomeController)

incomeRoute.get("/income",verifyUser,getIncomeController)

incomeRoute.get("/download-income-excel",verifyUser,downloadExcelController)
incomeRoute.delete("/income/:id",deleteIncomeController)
incomeRoute.patch("/income/:id",verifyUser,updateIncomeController)