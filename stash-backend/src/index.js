import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/index.js";
import chalk from "chalk"; // for styling and colorizing text in the terminal
import { createServer } from "http";
import { Server } from "socket.io";

// env config
dotenv.config({
  path: "./.env",
});

// port config
const port = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // later you can restrict to your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

export { io };

// start server only after DB connection
connectDB()
  .then(() =>
    server.listen(port, "0.0.0.0", () =>
      console.log(
        chalk.green.bold.italic(`🚀 Server running on http://localhost:${port}`)
      )
    )
  )
  .catch((error) => {
    console.log(chalk.red.bold("🔴 Mongo DB connection failed!", error));
    process.exit(1);
  });
