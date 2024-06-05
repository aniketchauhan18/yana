import { Request, Response } from "express";
import {
  entityAlreadyExists,
  entityNotFound,
  InternalServerError,
  InvalidRequestBody,
} from "../utils/errorResponse";
import {
  userLoginSchema,
  userRegisterationValidation,
} from "../validation/user/user.valdiation";
import User from "../models/user.schema";
import { hashPassword, decodePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

export const createUser = async (req: Request, res: Response) => {
  console.log("isnide");
  const { success, data } = userRegisterationValidation.safeParse(req.body);
  if (!success) {
    return InvalidRequestBody(res);
  }
  console.log(data);
  try {
    const userExists = await User.findOne({ username: data.username });
    const emailExits = await User.findOne({ email: data.email });
    if (userExists)
      return res.status(401).json({ message: "username already exists" });
    if (emailExits)
      return res.status(401).json({ message: "email already exists" });
    const hashedPassword = await hashPassword(data.password);
    const createUser = await User.create({
      ...data,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "User created successfully" });
  } catch {
    return InternalServerError(res);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { success, data } = userLoginSchema.safeParse(req.body);
  if (!success) return InvalidRequestBody(res);
  try {
    const email = await User.findOne({ email: data.email });
    if (!email)
      return res.status(401).json({ message: "Email is not registered" });
    const decodedPassword = await decodePassword(data.password, email.password);
    if (!decodedPassword)
      return res.status(401).json({ message: "invalid password" });
    const token = generateToken({ userId: email._id.toString() });
    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.error(err);
  }
};
