import { Request, Response } from "express";
import { vehicleSchema } from "../validation/vehicle/vehicle.validation";
import {
  entityAlreadyExists,
  entityNotFound,
  InternalServerError,
  InvalidRequestBody,
} from "../utils/errorResponse";
import Vehicle from "../models/vehicle.model";
import { VehicleSchemaType } from "../validation/vehicle/vehicle.validation";

export const registerVehicle = async (req: Request, res: Response) => {
  // const userId: string = req.params.userId
  try {
    const { success, data } = vehicleSchema.safeParse(req.body);
    console.log(success);
    if (!success || data == undefined) return InvalidRequestBody(res);
    const exists = await Vehicle.findOne({
      mode: data.model,
      ownerId: data.ownerId,
    });
    if (exists) return entityAlreadyExists(res, "Vehicle");
    const vehicle = await Vehicle.create(data);
    return res.status(201).json({ message: true, data: vehicle });
  } catch (err) {
    console.log("inside register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find();
    return res.status(200).json({ data: vehicles });
  } catch (err) {
    console.log("inside register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const getVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return entityNotFound(res, "Vehicle");
    return res.status(200).json({ data: vehicle });
  } catch (err) {
    console.log("inside register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      { _id: req.params.id }, // vehicle id
      req.body,
      { runValidators: true },
    );
    const updatedVehicle = await Vehicle.findById(vehicle?._id);
    return res
      .status(200)
      .json({ message: "Vehicle updated successfully", data: updatedVehicle });
  } catch (err) {
    console.log("inside register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Vehicle deleted successfully", data: vehicle });
  } catch (err) {
    console.log("inside register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const addMultipleVehicle = async (req: Request, res: Response) => {
  try {
    const vehicles: VehicleSchemaType[] = req.body;
    const checkVehicleExistence = await Vehicle.find({
      $or: vehicles.map((vehicle) => ({
        ownerId: vehicle.ownerId,
        model: vehicle.model,
      })), // checking if any of the vehicle already exists
    });
    if (checkVehicleExistence)
      return res.status(200).json({ message: "Some Vehicles already exists" });
    const result: VehicleSchemaType[] = await Vehicle.insertMany(vehicles);
    return res
      .status(201)
      .json({ message: "Vehicles added successfully", data: result });
  } catch (err) {
    console.log("inside register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};
