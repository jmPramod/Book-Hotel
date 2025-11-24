import express, { NextFunction, Request, Response } from "express"; 
import { addIncomeController, createIncomeController, deleteIncomeController, downloadExcelController } from "../controller/income.controller";
import { verifyUser } from "../middlewears/verify.token.middlewear";
 
export const incomeRoute = express.Router();
console.log("income route");

incomeRoute.post("/income",verifyUser,addIncomeController)

incomeRoute.get("/income",(req,res)=>{
res.send("income")
})

incomeRoute.get("/download-excel",downloadExcelController)
incomeRoute.delete("/income/:id",deleteIncomeController)