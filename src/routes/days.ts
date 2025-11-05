import { Router } from "express";
import { DayStory } from "../models/DayStoty";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const days = await DayStory.findAll();
    res.json(days);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении историй" });
  }
});

export default router;
