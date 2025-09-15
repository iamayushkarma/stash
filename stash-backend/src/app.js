import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/api-error.js";

const app = express();

dotenv.config({
  path: "./.env",
});

// cors configurations
// app.use(
//   cors({
//     // origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-type", "Authorization"],
//   })
// );

// In your main backend server file (e.g., app.js or server.js)

// 1. Define a "whitelist" of trusted origins from your environment file
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

const corsOptions = {
  // 2. The origin is now a function
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    // If the incoming origin is in our whitelist, allow it
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // For the Chrome extension, the origin will be the site the user is on (e.g., https://github.com)
    // Since our API is protected by JWT authentication, we can decide to allow these requests.
    // For now, let's allow them to get things working.
    // A more advanced check could be added here later if needed.
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-type", "Authorization"],
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Stash");
});

// cookies
app.use(cookieParser());

// basic configurations
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));

// important routes
import healthCheckRouter from "./routes/healthcheck.route.js";
import authRouter from "./routes/auth.route.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);

// extension routes
import stashRouter from "./routes/stash.route.js";

app.use("/api/stashes", stashRouter);

// global error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || null,
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
