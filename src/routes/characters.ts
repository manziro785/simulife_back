import { Router } from "express";
import { Character } from "../models/Character";
import { Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении персонажей" });
  }
});

export default router;
