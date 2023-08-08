import bcrypt from "bcryptjs";
import { User } from "../../models/index.mjs";
import jwt from "jsonwebtoken";

export const SignUpUserController = async (req, res) => {
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser)
    return res.status(400).json({
      msg: "user with this email alredy exists!",
    });
  try {
    const hashSalt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, hashSalt);
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
};

export const SignInUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        msg: "email or password is wrong",
      });

    const passwordValidate = await bcrypt.compare(password, user.password);

    if (!passwordValidate) {
      return res.status(400).json({
        msg: "email or password is wrong",
      });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
