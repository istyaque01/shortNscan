import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://istyaquezafar05:istyaque123@cluster0.2505yir.mongodb.net/"
    );
    console.log("connectd to DB...");
    
  } catch (error) {
        console.log("Failed to connect DB : ",error);

  }
};


export default connectDB