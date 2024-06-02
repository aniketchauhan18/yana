import mongoose from "mongoose"
import { MONGODB_URI } from '../src/config'

const connectDB = async ():Promise<void> => {
  try {
    const connect= await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB is connected to ${connect.connection.port}`);
  } catch (err) {
    console.error('Failed to connect to MongoDB',err)
    throw new Error("Error inside connectDB")
  }
}

export default connectDB;