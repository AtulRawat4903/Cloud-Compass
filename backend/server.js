import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);


app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
app.use("/api/weather", weatherRoutes);

app.use(notFound);
app.use(errorHandler);


const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Weather API running on http://localhost:${PORT}`);
  });
};

start();