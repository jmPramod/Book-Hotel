import mongoose, { Schema, Document } from "mongoose";
import Joi, { number } from "joi";
export interface Auth extends Document {
  userId: string;
  icon: string;
  source: string;
  amount: number;
  date: Date;
   


}

const IncomeSchema: Schema = new Schema(
  {
      userId: {type:mongoose.Schema.Types.ObjectId,ref:"users",require:true},
  icon: {type:String,},
  source: {type:String,required:true},
  amount: {type:Number,required:true},
  date: {type:Date,default:Date.now()}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Auth>("income", IncomeSchema);
 
export const incomeValidationSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      "any.required": "User ID is required.",
      "string.empty": "User ID cannot be empty.",
    }),
  icon: Joi.string().allow(null, "").optional().messages({
    "string.base": "Icon must be a string.",
  }),
  source: Joi.string()
    .required()
    .messages({
      "any.required": "Source is required.",
      "string.empty": "Source cannot be empty.",
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