import jwt from "jsonwebtoken";

export const validationMiddleWare = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    res.status(400).json(err);
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "Un Authorized" });
    }
    const validate = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!validate) {
      return res.status(401).json({ msg: "Access denied" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Access denied" });
  }
};
