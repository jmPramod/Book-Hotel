import mongoose, { Schema, Document } from "mongoose";
import Joi, { number } from "joi";
export interface Auth extends Document {
  userId: string;
  icon: string;
  category: string;
  amount: number;
  date: Date;
   


}

const ExpenseSchema: Schema = new Schema(
  {
      userId: {type:mongoose.Schema.Types.ObjectId,ref:"users",require:true},
  icon: {type:String,},
  category: {type:String,required:true},
  amount: {type:Number,required:true},
  date: {type:Date,default:Date.now()}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Auth>("expense", ExpenseSchema);
 
export const expenseValidationSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      "any.required": "User ID is required.",
      "string.empty": "User ID cannot be empty.",
    }),
  icon: Joi.string().allow(null, "").optional().messages({
    "string.base": "Icon must be a string.",
  }),
  category: Joi.string()
    .required()
    .messages({
      "any.required": "category is required.",
      "string.empty": "category cannot be empty.",
    }),
  amount: Joi.number()
    .required()
    .messages({
      "any.required": "Amount is required.",
      "number.base": "Amount must be a number.",
    }),
  date: Joi.date()
    .optional()
    .messages({
      "date.base": "Date must be a valid date.",
    }),
});
// export const/