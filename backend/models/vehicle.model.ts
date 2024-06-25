import mongoose from "mongoose";
const Schema = mongoose.Schema;

const VehicleSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Car",
        "Truck",
        "Motorcycle",
        "Bus",
        "Van",
        "Suv",
        "Bike",
        "Bicycle",
        "Other",
      ],
      required: true,
    },
    isAvailable: {
      type: String,
      enum: ["Yes", "No"],
      default: "yes",
      required: true,
    },
    ImageUrls: {
      type: [String],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    endDate: {  
      type: Date,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);
const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
