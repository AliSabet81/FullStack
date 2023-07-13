import { Router } from "express";
import { SignUpSchema, User } from "./../../models/index.mjs";
import bcript from "bcryptjs";
import { validate } from "../../helpers/index.mjs";
export const AuthRoutes = Router();



AuthRoutes.post("/sign-up", validate(SignUpSchema), async (req, res) => {
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser)
    return res.status(400).json({
      msg: "username with this email alredy exists!",
    });
  try {
    const password = await bcript.genSalt(10);
    const hashed = await bcript.hash(process.env.SECRET_KEY, password);
    const { repeatPassword, ...restBody } = req.body;
    const user = await new User({ ...restBody, password: hashed });
    await user.save();
    res.status(201).json({
      user,
      msg: "user created successfully",
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
