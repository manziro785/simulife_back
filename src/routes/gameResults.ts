import { Router, Request, Response } from "express";
import { GameResult } from "../models/GameResult";
import { authMiddleware } from "../middleware/auth";
import { User } from "../models/User";
import { Character } from "../models/Character";

const router = Router();

router.post("/save", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { characterId, mood, money, energy } = req.body;
    const userId = (req as any).user.id;

    if (
      !characterId ||
      mood === undefined ||
      money === undefined ||
      energy === undefined
    ) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const existing = await GameResult.findOne({
      where: { userId, characterId },
    });

    if (existing) {
      await existing.update({ mood, money, energy, completedAt: new Date() });
      return res.json({
        message: "Результат обновлен",
        result: existing,
      });
    } else {
      const newResult = await GameResult.create({
        userId,
        characterId,
        mood,
        money,
        energy,
      });
      return res.json({
        message: "Результат сохранён",
        result: newResult,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при сохранении результата" });
  }
});

router.get("/all", authMiddleware, async (req: Request, res: Response) => {
  try {
    const results = await GameResult.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "nickname"], // email, nickname пользователя
        },
        {
          model: Character,
          attributes: ["id", "name"], // имя персонажа
        },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении результатов" });
  }
});

router.get(
  "/my-results",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;

      const results = await GameResult.findAll({
        where: { userId },
        order: [["completedAt", "DESC"]],
      });

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении результатов" });
    }
  }
);

router.get(
  "/character/:characterId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { characterId } = req.params;

      const result = await GameResult.findOne({
        where: { userId, characterId },
      });

      if (!result) {
        return res.status(404).json({ message: "Результат не найден" });
      }

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении результата" });
    }
  }
);

export default router;
