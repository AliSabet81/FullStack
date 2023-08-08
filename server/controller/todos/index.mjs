import sharp from "sharp";
import appRootPath from "app-root-path";
import { Todo } from "../../models/todos/index.mjs";

export const AddTodoController = async (req, res) => {
  console.log(req.files);
  try {
    if (!req.files) {
      return res.status(400).json({
        msg: "image is required",
      });
    }

    console.log(appRootPath.resolve(`/uploads/todos/${req.files.img.md5}.jpg`));
    await sharp(req.files.img.data)
      .jpeg({ quality: 60 })
      .toFile(appRootPath.resolve(`/uploads/todos/${req.files.img.md5}.jpg`));
    const todo = new Todo({
      ...req.body,
      img: `/uploads/todos/${req.files.img.md5}.jpg`,
    });
    await todo.save();
    res.status(201).json({
      msg:"success"
    })
  } catch (err) {
    console.log(err);
  }
};

export const GetTodoController = async (req,res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json({data:todos})
    
  } catch (error) {
    console.log(error);
  }
}

export const UpdateTodoController = async (req,res) => {
  try {
    const params = req.params
    const UpdatedTodo = await Todo.findByIdAndUpdate(params.id,req.body)
    res.status(200).json({data:UpdatedTodo})
    
  } catch (error) {
    console.log(error);
  }
}

export const DeleteTodoController = async (req,res) => {
  try {
    const params = req.params
    const DeletedTodo = await Todo.findByIdAndDelete(params.id,req.body)
    res.status(200).json({data:DeletedTodo})
    
  } catch (error) {
    console.log(error);
  }
}

export const GetTodoByIdController = async (req,res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    res.status(200).json({data:todo})
    
  } catch (error) {
    console.log(error);
  }
}