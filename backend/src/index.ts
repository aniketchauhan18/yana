import express, { Express } from "express";
import cors from "cors";
import cron from "node-cron";
import connectDB from "./db/dbConnection";
import { PORT } from "./config";
import userRouter from "./routes/v1/user.routes";
import vehicleRouter from "./routes/v1/vehicle.routes";
import paymentRouter from "./routes/v1/payment.routes";

const app: Express = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://yana-vahan.vercel.app"],
}));
app.use(express.json());
connectDB();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/payments", paymentRouter);

app.listen(PORT || 3000, () =>
  console.log(`Server running on http://localhost:${PORT || 3000}`)
);