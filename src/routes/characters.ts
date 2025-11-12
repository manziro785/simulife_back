import { Router, Request, Response } from "express";
import { Character } from "../models/Character";
import { charactersData } from "../data/characters";
import { authMiddleware } from "../middleware/auth"; // ← импорт

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
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

export default router;
