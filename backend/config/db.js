import mongoose from "mongoose";

async function connectDB() {
  
  try {
    // console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI);
    
  } catch (err) {
    console.log(err);
  }
}

export default connectDB;
