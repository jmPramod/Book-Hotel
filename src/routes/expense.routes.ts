import express, { NextFunction, Request, Response } from "express"; 
import { addIncomeController, getIncomeController, deleteIncomeController, downloadExcelController } from "../controller/income.controller";
import { verifyUser } from "../middlewears/verify.token.middlewear";
import { addExpenseController, deleteExpenseController, downloadExcelExpenseController, getExpenseController, updateExpenseController } from "../controller/expense.controller";
 
export const expenseRoute = express.Router();
 

expenseRoute.post("/expense",verifyUser,addExpenseController)

expenseRoute.get("/expense",verifyUser,getExpenseController)
expenseRoute.delete("/expense/:id",verifyUser,deleteExpenseController)


expenseRoute.get("/download-expense-excel",verifyUser,downloadExcelExpenseController)
expenseRoute.patch("/expense/:id",verifyUser,updateExpenseController)