import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email и пароль обязательны" });

  const existing = await User.findOne({ where: { email } });
  if (existing)
    return res.status(400).json({ message: "Пользователь уже существует" });

  const newUser = await User.create({ email, password });
  const token = jwt.sign({ email: newUser.email }, JWT_SECRET, {
    expiresIn: "24h",
  });
  res.json({ message: "Регистрация успешна", token });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });
  if (!user)
    return res.status(401).json({ message: "Неверный логин или пароль" });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "24h",
  });
  res.json({ message: "Успешный вход", token });
});

export default router;
