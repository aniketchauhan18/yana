import { Request, Response } from "express";
import { vehicleSchema } from "../validation/vehicle/vehicle.validation";
import { entityAlreadyExists, entityNotFound, InternalServerError, InvalidRequestBody } from "../utils/errorResponse";
import Vehicle from "../models/vehicle.schema";
import { VehicleSchemaType } from "../validation/vehicle/vehicle.validation";

export const registerVehicle = async (req: Request, res: Response) => {
  const { success, data } = vehicleSchema.safeParse(req.body);
  if (!success || data == undefined) return InvalidRequestBody(res);
  try {
    const exists = await Vehicle.findOne({ mode: data.model, owner: data.owner });
    if (exists) return entityAlreadyExists(res, 'Vehicle');
    const vehicle = await Vehicle.create(data);
    return res.status(201).json({ message: true, data: vehicle });
  } catch (err) {
    console.log('inside register vehicle')
    console.log(err)
    return InternalServerError(res);
  }
}

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find();
    return res.status(200).json({ data: vehicles });
  } catch (err) {
    console.log('inside register vehicle')
    console.log(err)
    return InternalServerError(res);
  }
}

export const getVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return entityNotFound(res, 'Vehicle');
    return res.status(200).json({ data: vehicle });
  } catch (err) {
    console.log('inside register vehicle')
    console.log(err)
    return InternalServerError(res);
  }
}

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate({_id: req.params.id}, req.body, {runValidators: true})
    return res.status(200).json({ message: 'Vehicle updated successfully', data: vehicle });
  } catch (err) {
    console.log('inside register vehicle')
    console.log(err)
    return InternalServerError(res);
  }
}

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Vehicle deleted successfully', data: vehicle });
  } catch (err) {
    console.log('inside register vehicle')
    console.log(err)
    return InternalServerError(res);
  } 
}