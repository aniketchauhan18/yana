"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VehicleSchema = new Schema({
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
}, {
    timestamps: true,
});
const Vehicle = mongoose_1.default.model("Vehicle", VehicleSchema);
exports.default = Vehicle;
//# sourceMappingURL=vehicle.model.js.map