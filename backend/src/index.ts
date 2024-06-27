import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "../db/dbConnection";
import { PORT } from "./config";
import userRouter from "../routes/v1/user.routes";
import vehicleRouter from "../routes/v1/vehicle.routes";
import paymentRouter from "../routes/v1/payment.routes";
const app: Express = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use("/users", userRouter);
app.use("/vehicles", vehicleRouter);
app.use("/payments", paymentRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
