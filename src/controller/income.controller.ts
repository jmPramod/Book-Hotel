import { NextFunction, Request, Response } from "express";
import createError from "../utils/createError";
import xlsx from 'xlsx'
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

export const getIncomeController=async (req: Request, res: Response, next: NextFunction) => {
try {
  const userId=req.user_info.id
  const income =await IncomeSchema.find({userId}).sort({date:-1}) 
  
  if(!income)
{
  createError(401,'No income created')
}
   res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { income:income   },
          "Income Fetched successfully"
        )
      );
} catch (error) {
  
} 
}

export const downloadExcelController=async (req: Request, res: Response, next: NextFunction) => {
 try {
  const userId=req.user_info.id
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
  const income =await IncomeSchema.findOneAndDelete({incomeId}).sort({date:-1}) 
  
 
   res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { income:income   },
          "Income Deleted successfully"
        )
      );
} catch (error) {
  
} 

}