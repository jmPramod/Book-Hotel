import { NextFunction, Request, Response } from "express";
import createError from "../utils/createError";
import xlsx from 'xlsx' 
import { ApiResponse } from "../utils/ApiResponse";
import ExpenseSchema from "../Models/expense.models";
export const addExpenseController=async (req: Request, res: Response, next: NextFunction) => {
 const userId=req.user_info.userId
try {
    const {icon,category,amount,date}=req.body

if(!category||!amount||!date){
    createError(400,`The ${!category||!amount||!date} field is required`)
}

const newExpense=new ExpenseSchema({
    userId,icon,category,amount,date:Date.now()
})

await newExpense.save()
 
      

   res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:newExpense   },
          "Expense Created successfully"
        )
      );

} catch (error) {
    next(error)
    
}


}

export const updateExpenseController=async (req: Request, res: Response, next: NextFunction) => {
 const userId=req.user_info.userId
try {
     const userId = req.user_info.userId;
    const expenseId = req.params.id; // get ID from URL

    const { icon, category, amount, date } = req.body;

    // Validate
    if (!expenseId) {
      return res.status(400).json({ message: "Expense ID is required" });
    }

    const updatedExpense = await ExpenseSchema.findOneAndUpdate(
      { _id: expenseId, userId }, // ensure the user owns the expense
      { icon, category, amount, date },
      { new: true } // return updated document
    );

    if (!updatedExpense) {
      // return res.status(404).json({ message: "Expense not found" });
      return createError(404,"Expense not found" )
    }

   res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:updatedExpense   },
          "Expense Updated successfully"
        )
      );

} catch (error) {
    next(error)
    
}


}
export const getExpenseController=async (req: Request, res: Response, next: NextFunction) => {
try {
  const userId=req.user_info.userId
  const expense =await ExpenseSchema.find({userId}).sort({date:-1}) 
  
  if(!expense)
{
  createError(401,'No expense created')
}
   res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:expense   },
          "Expense Fetched successfully"
        )
      );
} catch (error) {
  next(error)
} 
}

export const downloadExcelExpenseController=async (req: Request, res: Response, next: NextFunction) => {
 try {
  const userId=req.user_info.userId
  const income=await ExpenseSchema.find({userId}).sort({date:-1})

  const data=income.map(item=>({
    Category:item.category,
    Amount:item.amount,
    Date:item.date
  }))

const wb=xlsx.utils.book_new()
const ws=xlsx.utils.json_to_sheet(data)
xlsx.utils.book_append_sheet(wb,ws,'Expense')
xlsx.writeFile(wb,'expense_details.xlsx')
res.download("expense_details.xlsx")


} catch (error) {
  next(error)
 }

}

export const deleteExpenseController=async (req: Request, res: Response, next: NextFunction) => {
 
try {
  const expenseId=req.params.id
  const expense =await ExpenseSchema.findOneAndDelete({expenseId}).sort({date:-1}) 
  
 
   res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data:expense   },
          "expense Deleted successfully"
        )
      );
} catch (error) {
  next(error)
} 

}