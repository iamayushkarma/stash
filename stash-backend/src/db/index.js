import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection)
      console.log(
        chalk.green.bold.italic(
          `MongoDB successfull connected to ${connection.connection.name}`
        )
      );
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      console.error(
        chalk.red.bold("MongoDB connection failed: Network issue!", error)
      );
    } else if (error.name === "MongoParseError") {
      console.error(
        chalk.red.bold("MongoDB connection failed: URI parse error!", error)
      );
    } else {
      console.error(chalk.red.bold("MongoDB connection failed:", error));
    }
    process.exit(1);
  }
};

export { connectDB };
