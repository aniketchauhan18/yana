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
import User from "../models/user.model";

export const registerVehicle = async (req: Request, res: Response) => {
  // const userId: string = req.params.userId
  try {
    console.log("registerVehicle");
    const { success, data, error } = vehicleSchema.safeParse(req.body);
    console.log(success);
    console.log(error?.errors[0].message);
    if (!success || data == undefined) return InvalidRequestBody(res);
    const exists = await Vehicle.findOne({
      mode: data.model,
      ownerId: data.ownerId,
    });
    if (exists) return entityAlreadyExists(res, "Vehicle");
    const vehicle = await Vehicle.create(data);
    return res.status(201).json({ message: true, data: vehicle });
  } catch (err) {
    console.log("inside here register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const getFilteredVehicles = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const query = req.params.query as string;
    const category = req.query.category as string;
    console.log(query);
    // console.log(category);
    if (!category) {
      const filteredVehicles = await Vehicle.find({
        $and: [
          {
            $or: [
              { model: new RegExp(query, "i") },
              { make: new RegExp(query, "i") },
            ],
          },
          { isAvailable: "Yes" },
        ],
      });
      console.log("Category is not present");
      return res.status(200).json({ data: filteredVehicles });
    }
    // }
    const filteredVehicles = await Vehicle.find({
      $and: [
        {
          $or: [
            { model: new RegExp(query, "i") },
            { make: new RegExp(query, "i") },
          ],
        },
        { category: category },
        { isAvailable: "Yes" },
      ],
    });
    console.log("both category and query are present");
    return res.status(200).json({ data: filteredVehicles });
  } catch (err) {
    console.log("inside get filtered register vehicle");
    return InternalServerError(res);
  }
};

export const getVehicles = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const vehicles = await Vehicle.find({ isAvailable: "Yes" });
    return res.status(200).json({ data: vehicles });
  } catch (err) {
    console.log("inside get vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const getVehicle = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return entityNotFound(res, "Vehicle");
    return res.status(200).json({ data: vehicle });
  } catch (err) {
    console.log("inside get register vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const getVehicleByUserId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const vehicles = await Vehicle.find({
      ownerId: req.params.id,
    });
    if (!vehicles) return entityNotFound(res, "Vehicles");
    return res.status(200).json({ data: vehicles });
  } catch (err) {
    return InternalServerError(res);
  }
};

export const updateVehicle = async (
  req: Request,
  res: Response,
): Promise<Response> => {
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
    console.log("inside update vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const deleteVehicle = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Vehicle deleted successfully", data: vehicle });
  } catch (err) {
    console.log("inside delete vehicle");
    console.log(err);
    return InternalServerError(res);
  }
};

export const addMultipleVehicle = async (
  req: Request,
  res: Response,
): Promise<Response> => {
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

export const checkandRemoveExpiredRentals = async () => {
  const currentDate = new Date();
  const rentedVehicles = await Vehicle.find({
    isAvailable: "No",
  });
  for (const rentedVehicle of rentedVehicles) {
    console.log(rentedVehicle);
    if (!rentedVehicle.endDate) continue;
    // console.log(rentedVehicle.endDate);
    // console.log(rentedVehicle.endDate < currentDate);
    if (rentedVehicle.endDate < currentDate) {
      // const user = await User.findById(rentedVehicle.ownerId);
      // console.log(user);
      // console.log(registerVehicle);
      console.log(rentedVehicle._id);
      const updatedVehicle = await Vehicle.findOneAndUpdate(
        { _id: rentedVehicle._id },
        {
          $set: {
            bookedBy: null,
            startDate: null,
            endDate: null,
            isAvailable: "Yes", // or any other field you want to update
          },
        },
        { new: true }, // This option returns the updated document
      );
      console.log("hi");
      const user = await User.findById(rentedVehicle.bookedBy);
      // console.log(user);
      if (user) {
        user.rentedVehicles = user.rentedVehicles.filter((veh) => {
          return veh.toString() !== rentedVehicle._id.toString();
        });
        await user.save();
        console.log(user);
      }
    }
    // const users = await Vehicle.find({}).populate('ownerId');
  }
};

checkandRemoveExpiredRentals();
