import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    rentedVehicles: [
      {
        vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle" },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.index({ "rentedVehicles.endDate": 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model("User", userSchema);

export default User;
