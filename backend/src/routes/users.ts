import express, { Request, Response } from "express";
const router = express.Router();
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        "X4TFuGQ8KOEMcTUKmZD2RLvXxQ37cIH5",
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      // res.status(200).send(token).send({ message: "User registered OK" });
      res.status(200).json({ token, message: "User registered OK" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Something went wrong!" });
    }
  }
);

export default router;
