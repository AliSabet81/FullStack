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
