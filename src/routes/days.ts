import { Router, Request, Response } from "express";
import { DayStory } from "../models/DayStoty";
import { authMiddleware } from "../middleware/auth"; 

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const days = await DayStory.findAll();
    const mapped = days.map((d) => ({
      ...d.toJSON(),
      choices: d.choices ?? [],
      lesson: d.lesson ?? {},
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении историй" });
  }
});

export default router;
