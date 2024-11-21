import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { DataBaseConnect } from "./database/dataBaseConnection.js";
import sequenceRoutes from "./routes/sequence/sequence.Routes.js";
import authRoutes from "./routes/auth/auth.Routes.js";

dotenv.config();
DataBaseConnect();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration
app.use(cors({
  origin: ['https://salesblinkfrontend.netlify.app', "http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma', 'X-Requested-With'],
  credentials: true, // Allow credentials (cookies, etc.)
}));

app.options('*', cors()); // Handle preflight requests explicitly
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/email", sequenceRoutes);
app.use("/api/v1/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
