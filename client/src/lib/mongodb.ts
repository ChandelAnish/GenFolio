import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("FAILED to connect to mongoDB :\n", error);
  }
}
