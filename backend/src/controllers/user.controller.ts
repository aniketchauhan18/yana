import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  entityAlreadyExists,
  entityNotFound,
  InternalServerError,
  InvalidRequestBody,
} from "../utils/errorResponse";
import {
  userLoginSchema,
  userRegisterationValidation,
  userUpdateValidation,
} from "../validation/user/user.valdiation";
import User from "../models/user.model";
import { hashPassword, decodePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

export const createUser = async (req: Request, res: Response) => {
  console.log("creatUser");
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
    const token = generateToken({
      userId: email._id.toString(),
      username: email.username,
    });
    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return entityNotFound(res, "User");
    return res.status(200).json({ user });
  } catch (err) {
    return InternalServerError(res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = userUpdateValidation.safeParse(req.body);
    console.log(error?.errors[0].message);
    if (!success) return InvalidRequestBody(res);
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, data, {
      runValidators: true,
    });
    const updatedUser = await User.findById(user?._id);
    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return InternalServerError(res);
  }
};

export const addRentedVehicles = async (req: Request, res: Response) => {
  try {
    const { rentedVehicle } = req.body;
    console.log(rentedVehicle);
    if (!mongoose.Types.ObjectId.isValid(rentedVehicle)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { rentedVehicles: rentedVehicle } },
      { new: true, runValidators: true },
    );
    if (!user) return entityNotFound(res, "User");
    return res.status(200).json({
      message: "User updated successfully",
      data: {
        rentedVehicles: user?.rentedVehicles,
      },
    });
  } catch (err) {
    console.log("error inside addRentedVehicles");
    console.log(err);
    return InternalServerError(res);
  }
};

export const getRentedVehicles = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "rentedVehicles",
      model: "Vehicle",
    });
    // populating vehicle to eplace the vehicle IDs in the rentedVehicles array with the corresponding vehicle documents.
    console.log("user", user);
    console.log("rentedVehicles", user?.rentedVehicles);
    if (!user) return entityNotFound(res, "User");
    return res.status(200).json({
      data: user.rentedVehicles,
    });
  } catch (err) {
    console.log(err);
    console.log("error inside getRentedVehicles");
    return InternalServerError(res);
  }
};
