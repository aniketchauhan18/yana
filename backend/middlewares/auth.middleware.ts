import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../src/config";

type TokenType = string | undefined;

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: TokenType = req.headers.authorization?.split(" ")[1];
  // req.headers.authorization?.split(' ')
  if (!token) return res.status(401).json({ message: "No Token provided" });
  const verifyToken: string | JwtPayload = jwt.verify(token, SECRET_KEY);
  if (!verifyToken) return res.status(401).json({ message: "Invaldi jwt" });
  console.log(verifyToken);
  next();
};
