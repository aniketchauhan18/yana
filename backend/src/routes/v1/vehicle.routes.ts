import express, { Router } from "express";
import {
  getVehicle,
  getVehicles,
  getVehicleByUserId,
  registerVehicle,
  updateVehicle,
  deleteVehicle,
  addMultipleVehicle,
  getFilteredVehicles,
} from "../../controllers/vehicle.controller";
import { authenticateJwt } from "../../middlewares/auth.middleware";

const router: Router = express.Router();

router.route("/").get(getVehicles);
router.route("/:id").get(getVehicle);
router.route("/filter/:query/:category").get(getFilteredVehicles);
router.route("/user/:id").get(getVehicleByUserId);
router.route("/register/:userId").post(authenticateJwt, registerVehicle);
router.route("/registerMany/:userId").post(authenticateJwt, addMultipleVehicle);
router.route("/update/:id").put(authenticateJwt, updateVehicle);
router.route("/delete/:id").delete(authenticateJwt, deleteVehicle);

export default router;
