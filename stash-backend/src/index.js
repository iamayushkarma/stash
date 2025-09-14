import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/index.js";
import chalk from "chalk"; // for styling and colorizing text in the terminal

// env config
dotenv.config({
  path: "./.env",
});

// port config
const port = process.env.PORT || 3000;

// starts server only on mongodb connection
connectDB()
  .then(() =>
    app.listen(port, "0.0.0.0", () =>
      console.log(
        chalk.green.bold.italic(`Server is running on http://localhost:${port}`)
      )
    )
  )
  .catch((error) => {
    console.log(chalk.red.bold(("🔴  Mongo DB connection faild!", error)));
    process.exit(1);
  });
