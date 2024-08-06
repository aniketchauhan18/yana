"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);
// userSchema.index({ "rentedVehicles.endDate": 1 }, { expireAfterSeconds: 0 });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map
