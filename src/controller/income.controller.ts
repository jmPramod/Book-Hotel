import { NextFunction, Request, Response } from "express";
import createError from "../utils/createError";

import IncomeSchema   from "../Models/icome.models";
import { ApiResponse } from "../utils/ApiResponse";
export const addIncomeController=async (req: Request, res: Response, next: NextFunction) => {
 const userId=req.user_info.id
try {
    const {icon,source,amount,date}=req.body

if(!source||!amount||!date){
    createError(400,`The ${!source||!amount||!date} field is required`)
}

const newIncome=new IncomeSchema({
    userId,icon,source,amount,date:Date.now()
})

await newIncome.save()
 
      

   res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { income:newIncome   },
          "Income Created successfully"
        )
      );

} catch (error) {
    next(error)
    
}


}

export const createIncomeController=async (req: Request, res: Response, next: NextFunction) => {
 }

export const downloadExcelController=async (req: Request, res: Response, next: NextFunction) => {
 

}

export const deleteIncomeController=async (req: Request, res: Response, next: NextFunction) => {
 }