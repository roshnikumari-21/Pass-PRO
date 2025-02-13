import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  

const mongoURI = process.env.MONGO_URI; 

const connectdb = async () => {
    if (!mongoURI) {
        console.error("❌ MONGO_URI is missing. Please check your environment variables.");
        process.exit(1); // Stop execution if URI is missing
      }
  try {
    await mongoose.connect(mongoURI
       
    );
    console.log("mongo connected successfully...");
  } catch (error) {
    console.log("not connected, check");
  }
};

export default connectdb;
