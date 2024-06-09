import express, { Router } from "express";
import {
  createUser,
  loginUser,
  getUserById,
  updateUser,
} from "../../controllers/user.controller";
import { authenticateJwt } from "../../middlewares/auth.middleware";

const router: Router = express.Router();
console.log("user.routes");
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/profile/:id").get(getUserById);
router.route("/update/:id").patch(authenticateJwt, updateUser);

export default router;
