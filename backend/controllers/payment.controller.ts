import { Request, Response } from "express"
import Razorpay from 'razorpay';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../src/config";
import Payment from "../models/payment.model";

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export const checkout = async (req: Request, res: Response) => {
  const options = {
    amount: Number(req.body.amount) * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order)
  return res.status(200).json({
    message: "Order created successfully",
    order
  });
};

export const paymentVerification = async(req: Request, res: Response) => {
  console.log(req.body)
  return res.status(200).json({
    message:"Payment Successfull",
    data: req.body
  }) 
}

export const storePaymentDetails = async(req: Request, res: Response) => {
  const vehicleId = req.params.id
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature, amount } = req.body;
  console.log(req.body)

  const createPayment = await Payment.create({
    userId: req.body.userId,
    vehicleId: vehicleId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    status: "Success",
    amount: amount,
  })
  console.log("storePayment", createPayment)
  return res.status(200).json({
    message: "Payment stored successfully",
    createPayment
  })
}

export const getKey = async(req: Request, res: Response) => {
  return res.status(200).json({
    key: RAZORPAY_KEY_ID
  })
}