import { Router } from "express";
import { Character } from "../models/Character";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении персонажей" });
  }
});

export default router;
