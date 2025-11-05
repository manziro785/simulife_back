import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import charactersRoutes from "./routes/characters";
import daysRoutes from "./routes/days";
import sequelize from "./db";
import "./models/User";
import "./models/Character";
import "./models/DayStoty";
import { Request, Response } from "express";

dotenv.config(); // загружаем переменные окружения

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/days", daysRoutes);

app.get("/", (req: Request, res: Response) =>
  res.send("SimuLife Backend is running!")
);
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // синхронизируем модели
    console.log("✅ Database connected and synchronized!");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();
