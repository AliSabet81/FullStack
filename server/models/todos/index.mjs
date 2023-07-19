import mongoose, { Schema } from "mongoose";
import * as yup from "yup";

export const TodoSchema = yup.object({
  body: yup.object({
    title: yup.string().required("required"),
    description: yup.string().required(),
  }),
});


const TodosSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description : String,
  img : String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Todo = mongoose.model("Todo", TodosSchema);
