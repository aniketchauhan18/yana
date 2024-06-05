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
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "car",
        "truck",
        "motorcycle",
        "bus",
        "van",
        "suv",
        "bike",
        "bicycle",
        "other",
      ],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
