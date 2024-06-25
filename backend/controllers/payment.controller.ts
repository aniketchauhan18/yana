import { Request, Response } from "express"
import Razorpay from 'razorpay';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../src/config";

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export const checkout = async (req: Request, res: Response) => {
  const options = {
    amount: Number(req.body.amount) * 100,  // amount in the smallest currency unit
    currency: "INR",
    // receipt: "order_rcptid_11"
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

export const getKey = async(req: Request, res: Response) => {
  return res.status(200).json({
    key: RAZORPAY_KEY_ID
  })
}