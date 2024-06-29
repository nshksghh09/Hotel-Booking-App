import express from "express";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import brcypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verify } from "crypto";
import verifyToken from "../middlewares/auth";
const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await brcypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(500).json({ msg: "Invalid Credentials" });
      }
      const token = jwt.sign(
        { userId: user.id },
        "X4TFuGQ8KOEMcTUKmZD2RLvXxQ37cIH5",
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "somethin went wrong!!" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth-token", "", {
    expires: new Date(0),
  });
  res.send();
});
export default router;
