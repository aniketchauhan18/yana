"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = exports.storePaymentDetails = exports.paymentVerification = exports.checkout = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const config_1 = require("../src/config");
const payment_model_1 = __importDefault(require("../models/payment.model"));
const instance = new razorpay_1.default({
    key_id: config_1.RAZORPAY_KEY_ID,
    key_secret: config_1.RAZORPAY_KEY_SECRET,
});
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        amount: Number(req.body.amount) * 100,
        currency: "INR",
    };
    const order = yield instance.orders.create(options);
    console.log(order);
    return res.status(200).json({
        message: "Order created successfully",
        order,
    });
});
exports.checkout = checkout;
const paymentVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    return res.status(200).json({
        message: "Payment Successfull",
        data: req.body,
    });
});
exports.paymentVerification = paymentVerification;
const storePaymentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleId = req.params.id;
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, amount } = req.body;
    console.log(req.body);
    const createPayment = yield payment_model_1.default.create({
        userId: req.body.userId,
        vehicleId: vehicleId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        status: "Success",
        amount: amount,
    });
    console.log("storePayment", createPayment);
    return res.status(200).json({
        message: "Payment stored successfully",
        createPayment,
    });
});
exports.storePaymentDetails = storePaymentDetails;
const getKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        key: config_1.RAZORPAY_KEY_ID,
    });
});
exports.getKey = getKey;
