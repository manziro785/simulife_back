import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import charactersRoutes from "./routes/characters";
import daysRoutes from "./routes/days";
import { sequelize } from "./db";
import "./models/User";
import "./models/Character";
import "./models/DayStoty";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized!");
  } catch (err) {
    console.error("❌ Sync error:", err);
  }
})();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/days", daysRoutes);

app.get("/", (_, res) => res.send("SimuLife Backend is running!"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
