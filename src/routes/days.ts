import { Router, Request, Response } from "express";
import { DayStory } from "../models/DayStoty";
import { daysData } from "../data/dayStories"; // путь к твоему файлу

const router = Router();

// GET всех дней
router.get("/", async (req: Request, res: Response) => {
  try {
    const days = await DayStory.findAll();
    res.json(days);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении историй" });
  }
});

// POST - добавить дни из массива
router.post("/seed", async (_req: Request, res: Response) => {
  try {
    const created = await Promise.all(
      daysData.map((day) =>
        DayStory.create({
          day: day.day,
          title: day.title,
          description: day.description,
          context: day.context,
          choices: day.choices,
          lesson: day.lesson,
        })
      )
    );
    res.status(201).json({ message: "Дни добавлены", count: created.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении дней" });
  }
});

export default router;
