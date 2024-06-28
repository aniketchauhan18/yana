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
exports.loginUser = exports.createUser = void 0;
const errorResponse_1 = require("../utils/errorResponse");
const user_valdiation_1 = require("../validation/user/user.valdiation");
const user_schema_1 = __importDefault(require("../models/user.schema"));
const hashPassword_1 = require("../utils/hashPassword");
const generateToken_1 = require("../utils/generateToken");
const createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log("isnide");
    const { success, data } =
      user_valdiation_1.userRegisterationValidation.safeParse(req.body);
    if (!success) {
      return (0, errorResponse_1.InvalidRequestBody)(res);
    }
    console.log("sssssssssssssssssss");
    try {
      const userExists = yield user_schema_1.default.findOne({
        username: data.username,
      });
      console.log(userExists);
      const emailExits = yield user_schema_1.default.findOne({
        email: data.email,
      });
      if (userExists)
        return res.status(401).json({ message: "username already exists" });
      console.log(userExists);
      if (emailExits)
        return res.status(401).json({ message: "email already exists" });
      console.log(emailExits);
      const hashedPassword = yield (0, hashPassword_1.hashPassword)(
        data.password,
      );
      const createUser = yield user_schema_1.default.create(
        Object.assign(Object.assign({}, data), { password: hashedPassword }),
      );
      return res.status(200).json({ message: "User created successfully" });
    } catch (_a) {
      (0, errorResponse_1.InternalServerError)(res);
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
      const email = yield user_schema_1.default.findOne({ email: data.email });
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
      });
      return res.status(200).json({
        token,
      });
    } catch (err) {
      console.error(err);
    }
  });
exports.loginUser = loginUser;
