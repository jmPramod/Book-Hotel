import { NextFunction, Request, Response } from "express";
import createError from "../utils/createError";
import xlsx from 'xlsx'
import IncomeSchema   from "../Models/icome.models";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";
export const addIncomeController=async (req: Request, res: Response, next: NextFunction) => {
 const userId=req.user_info.userId
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
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:newIncome   },
          "Income Created successfully"
        )
      );

} catch (error) {
    next(error)
    
}


}

export const updateIncomeController=async (req: Request, res: Response, next: NextFunction) => {
 const userId=req.user_info.userId
try {
     const userId = req.user_info.userId;
    const expenseId = req.params.id; // get ID from URL

    const { icon, category, amount, date } = req.body;

    // Validate
    if (!expenseId) {
      return res.status(400).json({ message: "Expense ID is required" });
    }

    const updatedExpense = await IncomeSchema.findOneAndUpdate(
      { _id: expenseId, userId }, // ensure the user owns the expense
      { icon, category, amount, date },
      { new: true } // return updated document
    );

    if (!updatedExpense) {
      // return res.status(404).json({ message: "Expense not found" });
      return createError(404,"Income not found" )
    }

   res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:updatedExpense   },
          "Income Updated successfully"
        )
      );

} catch (error) {
    next(error)
    
}


}
export const getIncomeController=async (req: Request, res: Response, next: NextFunction) => {
try {
  const userId=req.user_info.userId
  const income =await IncomeSchema.find({userId}).sort({date:-1}) 
  
  if(!income)
{
  createError(401,'No income created')
}
   res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:income   },
          "Income Fetched successfully"
        )
      );
} catch (error) {
  
} 
}

export const downloadExcelController=async (req: Request, res: Response, next: NextFunction) => {
 try {
  const userId=req.user_info.userId
  const income=await IncomeSchema.find({userId}).sort({date:-1})

  const data=income.map(item=>({
    Source:item.source,
    Amount:item.amount,
    Date:item.date
  }))

const wb=xlsx.utils.book_new()
const ws=xlsx.utils.json_to_sheet(data)
xlsx.utils.book_append_sheet(wb,ws,'Income')
xlsx.writeFile(wb,'income_details.xlsx')
res.download("income_details.xlsx")


} catch (error) {
  next(error)
 }

}

export const deleteIncomeController=async (req: Request, res: Response, next: NextFunction) => {
 
try {
  const incomeId=req.params.id
  console.log("incomeId",incomeId);
  
const income = await IncomeSchema.findByIdAndDelete(
  new mongoose.Types.ObjectId(incomeId)
);
   res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:income,incomeId   },
          "Income Deleted successfully"
        )
      );
} catch (error) {
  
} 

}