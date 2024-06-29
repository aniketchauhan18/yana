import express, { Express } from "express";
import cors from "cors";
import connectDB from "../db/dbConnection";
import userRouter from "../routes/v1/user.routes";
import vehicleRouter from "../routes/v1/vehicle.routes";
import paymentRouter from "../routes/v1/payment.routes";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use("/users", userRouter);
app.use("/vehicles", vehicleRouter);
app.use("/payments", paymentRouter);


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);