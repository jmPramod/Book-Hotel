import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
export interface Auth extends Document {
  name: string;
  firstName: string;
  lastName: string;
  phone: number;
  address: string;
  state: string;
  country: string;
  pinCode: number;
  email: string;
  password: string;
  isAdmin: string;
profileImage: {
  imageUrl: string,
  imgPublicId: string
}

}

const authSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    pinCode: { type: Number },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: String, enum: ["admin", "user"], default: "user" },
    profileImage: { type: {
      imageUrl: { type: String, default: "https://res.cloudinary.com/dtvq8ysaj/image/upload/v1720770108/Global%20Images/profile_new-removebg-preview_motz7n.png" },
      imgPublicId: { type: String, default: null }
    } },
 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Auth>("users", authSchema);

export const RegisterSchemaValidation = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required.",
    "string.empty": "First name cannot be empty.",
  }),
  lastName: Joi.string().allow(null, "").optional(),
  phone: Joi.number().required().messages({
    "any.required": "Phone number is required.",
    "number.base": "Phone number must be a number.",
    "number.empty": "Phone number cannot be empty.",
  }),
  address: Joi.string().allow(null, "").optional(),
  state: Joi.string().allow(null, "").optional(),
  country: Joi.string().required().messages({
    "any.required": "Country is required.",
    "string.empty": "Country cannot be empty.",
  }),
  pinCode: Joi.number().required().messages({
    "any.required": "Pin code is required.",
    "number.base": "Pin code must be a number.",
    "number.empty": "Pin code cannot be empty.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
  isAdmin: Joi.string().valid("admin", "user").default("user"),
 profileImage: Joi.object({
    imageUrl: Joi.string().uri().default(
      "https://res.cloudinary.com/dtvq8ysaj/image/upload/v1720770108/Global%20Images/profile_new-removebg-preview_motz7n.png"
    ),
    imgPublicId: Joi.string().allow(null).default(null)
  }).default({})
});
export const forgotPasswordSchemaValidation = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required.",
    "string.empty": "First name cannot be empty.",
  }),
  lastName: Joi.string().allow(null, "").optional(),
  accounts: Joi.array().items(Joi.object()), // Define Joi schema for array items if needed
  phone: Joi.number().required().messages({
    "any.required": "Phone number is required.",
    "number.base": "Phone number must be a number.",
    "number.empty": "Phone number cannot be empty.",
  }),
  address: Joi.string().allow(null, "").optional(),
  state: Joi.string().allow(null, "").optional(),
  country: Joi.string().required().messages({
    "any.required": "Country is required.",
    "string.empty": "Country cannot be empty.",
  }),
  pinCode: Joi.number().required().messages({
    "any.required": "Pin code is required.",
    "number.base": "Pin code must be a number.",
    "number.empty": "Pin code cannot be empty.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
  isAdmin: Joi.string().valid("admin", "user").default("user"),
});

// export const/