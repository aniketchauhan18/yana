import express, { Router } from "express";
import {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  addRentedVehicles,
  getRentedVehicles,
} from "../../controllers/user.controller";
import { authenticateJwt } from "../../middlewares/auth.middleware";

const router: Router = express.Router();
console.log("user.routes");
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/profile/:id").get(getUserById);
router.route("/update/:id").patch(authenticateJwt, updateUser);
router.route("/add/rented-vehicles/:id").put(addRentedVehicles); // add logic in controller for vehicle duplication
router.route("/rented-vehicles/:id").get(getRentedVehicles);

export default router;
