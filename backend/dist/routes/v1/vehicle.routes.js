"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("../../controllers/vehicle.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.route("/").get(vehicle_controller_1.getVehicles);
router.route("/:id").get(vehicle_controller_1.getVehicle);
router.route("/user/:id").get(vehicle_controller_1.getVehicleByUserId);
router.route("/register/:userId").post(auth_middleware_1.authenticateJwt, vehicle_controller_1.registerVehicle);
router.route("/registerMany/:userId").post(auth_middleware_1.authenticateJwt, vehicle_controller_1.addMultipleVehicle);
router.route("/update/:id").put(auth_middleware_1.authenticateJwt, vehicle_controller_1.updateVehicle);
router.route("/delete/:id").delete(auth_middleware_1.authenticateJwt, vehicle_controller_1.deleteVehicle);
exports.default = router;
