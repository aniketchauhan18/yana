import express, { Router } from "express";
import { checkout, paymentVerification, getKey } from "../../controllers/payment.controller";
const router: Router = express.Router();

router.route("/checkout").post(checkout);
router.route("/verification").post(paymentVerification)
router.route("/key").get(getKey)
export default router;