"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const paymentSchema = new Schema(
  {
    userId: {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleId: {
      type: mongoose_1.default.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    razorpaySignature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["Pending", "Success"], default: "Pending" },
  },
  {
    timestamps: true,
  },
);
const Payment = mongoose_1.default.model("Payment", paymentSchema);
exports.default = Payment;
//# sourceMappingURL=payment.model.js.map
