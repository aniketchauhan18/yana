"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMultipleVehicle = exports.deleteVehicle = exports.updateVehicle = exports.getVehicleByUserId = exports.getVehicle = exports.getVehicles = exports.registerVehicle = void 0;
const vehicle_validation_1 = require("../validation/vehicle/vehicle.validation");
const errorResponse_1 = require("../utils/errorResponse");
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const registerVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId: string = req.params.userId
    try {
        console.log("registerVehicle");
        const { success, data, error } = vehicle_validation_1.vehicleSchema.safeParse(req.body);
        console.log(success);
        console.log(error === null || error === void 0 ? void 0 : error.errors[0].message);
        if (!success || data == undefined)
            return (0, errorResponse_1.InvalidRequestBody)(res);
        const exists = yield vehicle_model_1.default.findOne({
            mode: data.model,
            ownerId: data.ownerId,
        });
        if (exists)
            return (0, errorResponse_1.entityAlreadyExists)(res, "Vehicle");
        const vehicle = yield vehicle_model_1.default.create(data);
        return res.status(201).json({ message: true, data: vehicle });
    }
    catch (err) {
        console.log("inside register vehicle");
        console.log(err);
        return (0, errorResponse_1.InternalServerError)(res);
    }
});
exports.registerVehicle = registerVehicle;
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield vehicle_model_1.default.find({ isAvailable: "Yes" });
        return res.status(200).json({ data: vehicles });
    }
    catch (err) {
        console.log("inside register vehicle");
        console.log(err);
        return (0, errorResponse_1.InternalServerError)(res);
    }
});
exports.getVehicles = getVehicles;
const getVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield vehicle_model_1.default.findById(req.params.id);
        if (!vehicle)
            return (0, errorResponse_1.entityNotFound)(res, "Vehicle");
        return res.status(200).json({ data: vehicle });
    }
    catch (err) {
        console.log("inside register vehicle");
        console.log(err);
        return (0, errorResponse_1.InternalServerError)(res);
    }
});
exports.getVehicle = getVehicle;
const getVehicleByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield vehicle_model_1.default.find({
            ownerId: req.params.id,
        });
        if (!vehicles)
            return (0, errorResponse_1.entityNotFound)(res, "Vehicles");
        return res.status(200).json({ data: vehicles });
    }
    catch (err) {
        return (0, errorResponse_1.InternalServerError)(res);
    }
});
exports.getVehicleByUserId = getVehicleByUserId;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield vehicle_model_1.default.findByIdAndUpdate({ _id: req.params.id }, // vehicle id
        req.body, { runValidators: true });
        const updatedVehicle = yield vehicle_model_1.default.findById(vehicle === null || vehicle === void 0 ? void 0 : vehicle._id);
        return res
            .status(200)
            .json({ message: "Vehicle updated successfully", data: updatedVehicle });
    }
    catch (err) {
        console.log("inside register vehicle");
        console.log(err);
        return (0, errorResponse_1.InternalServerError)(res);
    }
});
exports.updateVehicle = updateVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield vehicle_model_1.default.findByIdAndDelete(req.params.id);
        return res
            .status(200)
            .json({ message: "Vehicle deleted successfully", data: vehicle });
    }
    catch (err) {
        console.log("inside register vehicle");
        console.log(err);
        return (0, errorResponse_1.InternalServerError)(res);
    }
});
exports.deleteVehicle = deleteVehicle;
const addMultipleVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = req.body;
        const checkVehicleExistence = yield vehicle_model_1.default.find({
            $or: vehicles.map((vehicle) => ({
                ownerId: vehicle.ownerId,
                model: vehicle.model,
            })), // checking if any of the vehicle already exists
        });
        if (checkVehicleExistence)
            return res.status(200).json({ message: "Some Vehicles already exists" });
        const result = yield vehicle_model_1.default.insertMany(vehicles);
        return res
            .status(201)
            .json({ message: "Vehicles added successfully", data: result });
    }
    catch (err) {
        console.log("inside register vehicle");
        console.log(err);
        return (0, errorResponse_1.InternalServerError)(res);
    }
});
exports.addMultipleVehicle = addMultipleVehicle;
