import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth-token"];
  console.log(token);
  if (!token) {
    console.log("from first error code");
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "X4TFuGQ8KOEMcTUKmZD2RLvXxQ37cIH5");
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.log("from second error code");
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;
