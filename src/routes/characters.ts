import { Router, Request, Response } from "express";
import { Character } from "../models/Character";
import { charactersData } from "../data/characters"; // путь к твоему файлу

const router = Router();

// GET всех персонажей с полем stats для фронтенда
router.get("/", async (req: Request, res: Response) => {
  try {
    const characters = await Character.findAll();
    const mapped = characters.map((c) => ({
      ...c.toJSON(),
      stats: { money: c.money, energy: c.energy, mood: c.mood },
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении персонажей" });
  }
});

// POST - добавить персонажей из массива
router.post("/seed", async (_req: Request, res: Response) => {
  try {
    const created = await Promise.all(
      charactersData.map((char) =>
        Character.create({
          id: char.id,
          name: char.name,
          description: char.description,
          avatar: char.avatar,
          money: char.stats.money,
          energy: char.stats.energy,
          mood: char.stats.mood,
        })
      )
    );
    res
      .status(201)
      .json({ message: "Персонажи добавлены", count: created.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении персонажей" });
  }
});

export default router;
