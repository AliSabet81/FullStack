import mongoose, { Schema } from "mongoose";
import * as yup from "yup";

export const SignUpSchema = yup.object({
  body: yup.object({
    username: yup.string().required("required"),
    email: yup.string().required(),
    password: yup.string().required(),
    repeatPassword: yup.string().required(),
  }),
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  repeatPassword: String,
});

export const User = mongoose.model("User", UserSchema);
