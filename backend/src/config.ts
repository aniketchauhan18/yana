import * as dotenv from "dotenv";

dotenv.config();

export const PORT = parseInt(process.env.PORT || "3000", 10);
export const MONGODB_URI: string = process.env.MONGODB_URI as string;
export const SECRET_KEY: string = process.env.SECRET_KEY as string;
export const RAZORPAY_KEY_ID: string = process.env.RAZORPAY_KEY_ID as string;
export const RAZORPAY_KEY_SECRET: string = process.env
  .RAZORPAY_KEY_SECRET as string;
