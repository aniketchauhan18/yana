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
exports.getRentedVehicles =
  exports.addRentedVehicles =
  exports.updateUser =
  exports.getUserById =
  exports.loginUser =
  exports.createUser =
    void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorResponse_1 = require("../utils/errorResponse");
const user_valdiation_1 = require("../validation/user/user.valdiation");
const user_model_1 = __importDefault(require("../models/user.model"));
const hashPassword_1 = require("../utils/hashPassword");
const generateToken_1 = require("../utils/generateToken");
const createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log("creatUser");
    const { success, data } =
      user_valdiation_1.userRegisterationValidation.safeParse(req.body);
    if (!success) {
      return (0, errorResponse_1.InvalidRequestBody)(res);
    }
    console.log(data);
    try {
      const userExists = yield user_model_1.default.findOne({
        username: data.username,
      });
      const emailExits = yield user_model_1.default.findOne({
        email: data.email,
      });
      if (userExists)
        return res.status(401).json({ message: "username already exists" });
      if (emailExits)
        return res.status(401).json({ message: "email already exists" });
      const hashedPassword = yield (0, hashPassword_1.hashPassword)(
        data.password,
      );
      const createUser = yield user_model_1.default.create(
        Object.assign(Object.assign({}, data), { password: hashedPassword }),
      );
      return res.status(200).json({ message: "User created successfully" });
    } catch (_a) {
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.createUser = createUser;
const loginUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = user_valdiation_1.userLoginSchema.safeParse(
      req.body,
    );
    if (!success) return (0, errorResponse_1.InvalidRequestBody)(res);
    try {
      const email = yield user_model_1.default.findOne({ email: data.email });
      if (!email)
        return res.status(401).json({ message: "Email is not registered" });
      const decodedPassword = yield (0, hashPassword_1.decodePassword)(
        data.password,
        email.password,
      );
      if (!decodedPassword)
        return res.status(401).json({ message: "invalid password" });
      const token = (0, generateToken_1.generateToken)({
        userId: email._id.toString(),
        username: email.username,
      });
      return res.status(200).json({
        token,
      });
    } catch (err) {
      console.error(err);
    }
  });
exports.loginUser = loginUser;
const getUserById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield user_model_1.default.findById(req.params.id);
      if (!user) return (0, errorResponse_1.entityNotFound)(res, "User");
      return res.status(200).json({ user });
    } catch (err) {
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.getUserById = getUserById;
const updateUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { success, data, error } =
        user_valdiation_1.userUpdateValidation.safeParse(req.body);
      console.log(
        error === null || error === void 0 ? void 0 : error.errors[0].message,
      );
      if (!success) return (0, errorResponse_1.InvalidRequestBody)(res);
      const user = yield user_model_1.default.findByIdAndUpdate(
        { _id: req.params.id },
        data,
        {
          runValidators: true,
        },
      );
      const updatedUser = yield user_model_1.default.findById(
        user === null || user === void 0 ? void 0 : user._id,
      );
      return res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.updateUser = updateUser;
const addRentedVehicles = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { rentedVehicle } = req.body;
      console.log(rentedVehicle);
      if (!mongoose_1.default.Types.ObjectId.isValid(rentedVehicle)) {
        return res.status(400).json({ message: "Invalid vehicle ID" });
      }
      const user = yield user_model_1.default.findByIdAndUpdate(
        req.params.id,
        { $push: { rentedVehicles: rentedVehicle } },
        { new: true, runValidators: true },
      );
      if (!user) return (0, errorResponse_1.entityNotFound)(res, "User");
      return res.status(200).json({
        message: "User updated successfully",
        data: {
          rentedVehicles:
            user === null || user === void 0 ? void 0 : user.rentedVehicles,
        },
      });
    } catch (err) {
      console.log("error inside addRentedVehicles");
      console.log(err);
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.addRentedVehicles = addRentedVehicles;
const getRentedVehicles = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield user_model_1.default.findById(req.params.id).populate({
        path: "rentedVehicles",
        model: "Vehicle",
      });
      // populating vehicle to eplace the vehicle IDs in the rentedVehicles array with the corresponding vehicle documents.
      console.log(
        "rentedVehicles",
        user === null || user === void 0 ? void 0 : user.rentedVehicles,
      );
      if (!user) return (0, errorResponse_1.entityNotFound)(res, "User");
      return res.status(200).json({
        data: user.rentedVehicles,
      });
    } catch (err) {
      console.log(err);
      console.log("error inside getRentedVehicles");
      return (0, errorResponse_1.InternalServerError)(res);
    }
  });
exports.getRentedVehicles = getRentedVehicles;
//# sourceMappingURL=user.controller.js.map
