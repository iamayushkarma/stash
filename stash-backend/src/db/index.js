import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection)
      console.log(
        `MongoDB successfull connected to ${connection.connection.name}`
      );
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      console.error("MongoDB connection failed: Network issue!", error);
    } else if (error.name === "MongoParseError") {
      console.error("MongoDB connection failed: URI parse error!", error);
    } else {
      console.error("MongoDB connection failed:", error);
    }
    process.exit(1);
  }
};

export { connectDB };
