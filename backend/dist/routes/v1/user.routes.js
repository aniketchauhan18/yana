"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../controllers/user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
console.log("user.routes");
router.route("/register").post(user_controller_1.createUser);
router.route("/login").post(user_controller_1.loginUser);
router.route("/profile/:id").get(user_controller_1.getUserById);
router.route("/update/:id").put(auth_middleware_1.authenticateJwt, user_controller_1.updateUser);
router.route("/add/rented-vehicles/:id").put(user_controller_1.addRentedVehicles); // add logic in controller for vehicle duplication
router.route("/rented-vehicles/:id").get(user_controller_1.getRentedVehicles);
exports.default = router;
