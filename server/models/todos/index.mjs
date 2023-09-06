import mongoose, { Schema } from "mongoose";
import * as yup from "yup";
import mongoosePaginate from 'mongoose-paginate'

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
TodosSchema.plugin(mongoosePaginate)
export const Todo = mongoose.model("Todo", TodosSchema);
