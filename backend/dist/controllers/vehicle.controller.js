"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkandRemoveExpiredRentals =
  exports.addMultipleVehicle =
  exports.deleteVehicle =
  exports.updateVehicle =
  exports.getVehicleByUserId =
  exports.getVehicle =
  exports.getVehicles =
  exports.getFilteredVehicles =
  exports.registerVehicle =
    void 0;
const vehicle_validation_1 = require("../validation/vehicle/vehicle.validation");
const errorResponse_1 = require("../utils/errorResponse");
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const registerVehicle = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const userId: string = req.params.userId
    try {
      console.log("registerVehicle");
      const { success, data, error } =
        vehicle_validation_1.vehicleSchema.safeParse(req.body);
      console.log(success);
      console.log(
        error === null || error === void 0 ? void 0 : error.errors[0].message,
      );
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
    } catch (err) {
      console.log("inside here register vehicle");
      console.log(err);
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.registerVehicle = registerVehicle;
const getFilteredVehicles = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const query = req.params.query;
      const category = req.query.category;
      console.log(query);
      // console.log(category);
      if (!category) {
        const filteredVehicles = yield vehicle_model_1.default.find({
          $or: [
            { model: new RegExp(query, "i") },
            { make: new RegExp(query, "i") },
            { isAvailable: "Yes" },
          ],
        });
        return res.status(200).json({ data: filteredVehicles });
      }
      // }
      const filteredVehicles = yield vehicle_model_1.default.find({
        $and: [
          {
            $or: [
              { model: new RegExp(query, "i") },
              { make: new RegExp(query, "i") },
              { isAvailable: "Yes" },
            ],
          },
          { category: category },
        ],
      });
      console.log(filteredVehicles);
      console.log("inside get filtered vehicles");
      return res.status(200).json({ data: filteredVehicles });
    } catch (err) {
      console.log("inside get filtered register vehicle");
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.getFilteredVehicles = getFilteredVehicles;
const getVehicles = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vehicles = yield vehicle_model_1.default.find({
        isAvailable: "Yes",
      });
      return res.status(200).json({ data: vehicles });
    } catch (err) {
      console.log("inside get vehicle");
      console.log(err);
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.getVehicles = getVehicles;
const getVehicle = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vehicle = yield vehicle_model_1.default.findById(req.params.id);
      if (!vehicle) return (0, errorResponse_1.entityNotFound)(res, "Vehicle");
      return res.status(200).json({ data: vehicle });
    } catch (err) {
      console.log("inside get register vehicle");
      console.log(err);
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.getVehicle = getVehicle;
const getVehicleByUserId = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vehicles = yield vehicle_model_1.default.find({
        ownerId: req.params.id,
      });
      if (!vehicles)
        return (0, errorResponse_1.entityNotFound)(res, "Vehicles");
      return res.status(200).json({ data: vehicles });
    } catch (err) {
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.getVehicleByUserId = getVehicleByUserId;
const updateVehicle = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vehicle = yield vehicle_model_1.default.findByIdAndUpdate(
        { _id: req.params.id }, // vehicle id
        req.body,
        { runValidators: true },
      );
      const updatedVehicle = yield vehicle_model_1.default.findById(
        vehicle === null || vehicle === void 0 ? void 0 : vehicle._id,
      );
      return res
        .status(200)
        .json({
          message: "Vehicle updated successfully",
          data: updatedVehicle,
        });
    } catch (err) {
      console.log("inside update vehicle");
      console.log(err);
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.updateVehicle = updateVehicle;
const deleteVehicle = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vehicle = yield vehicle_model_1.default.findByIdAndDelete(
        req.params.id,
      );
      return res
        .status(200)
        .json({ message: "Vehicle deleted successfully", data: vehicle });
    } catch (err) {
      console.log("inside delete vehicle");
      console.log(err);
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.deleteVehicle = deleteVehicle;
const addMultipleVehicle = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vehicles = req.body;
      const checkVehicleExistence = yield vehicle_model_1.default.find({
        $or: vehicles.map((vehicle) => ({
          ownerId: vehicle.ownerId,
          model: vehicle.model,
        })), // checking if any of the vehicle already exists
      });
      if (checkVehicleExistence)
        return res
          .status(200)
          .json({ message: "Some Vehicles already exists" });
      const result = yield vehicle_model_1.default.insertMany(vehicles);
      return res
        .status(201)
        .json({ message: "Vehicles added successfully", data: result });
    } catch (err) {
      console.log("inside register vehicle");
      console.log(err);
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.addMultipleVehicle = addMultipleVehicle;
const checkandRemoveExpiredRentals = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const rentedVehicles = yield vehicle_model_1.default.find({
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
        const updatedVehicle = yield vehicle_model_1.default.findOneAndUpdate(
          { _id: rentedVehicle._id },
          {
            $set: {
              bookedBy: null,
              startDate: null,
              endDate: null,
              isAvailable: "Yes", // or any other field you want to update
            },
          },
          { new: true },
        );
        console.log("hi");
        const user = yield user_model_1.default.findById(
          rentedVehicle.bookedBy,
        );
        // console.log(user);
        if (user) {
          user.rentedVehicles = user.rentedVehicles.filter((veh) => {
            return veh.toString() !== rentedVehicle._id.toString();
          });
          yield user.save();
          console.log(user);
        }
      }
      // const users = await Vehicle.find({}).populate('ownerId');
    }
  });
exports.checkandRemoveExpiredRentals = checkandRemoveExpiredRentals;
(0, exports.checkandRemoveExpiredRentals)();
//# sourceMappingURL=vehicle.controller.js.map
