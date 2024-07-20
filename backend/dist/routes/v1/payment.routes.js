"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../../controllers/payment.controller");
const router = express_1.default.Router();
router.route("/checkout").post(payment_controller_1.checkout);
router.route("/verification").post(payment_controller_1.paymentVerification),
  router.route("/store/:id").post(payment_controller_1.storePaymentDetails);
router.route("/key").get(payment_controller_1.getKey);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map
