import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    type: Number
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  pincode: {
    type: Number
  },
  address: {
    type: String
  },
  dateOfBirth: {
    type: Date
  }
},{
  timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;