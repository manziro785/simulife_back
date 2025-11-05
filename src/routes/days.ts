import { Router, Request, Response } from "express";
import { DayStory } from "../models/DayStoty";

const router = Router();

// GET всех дней с сохранением структуры для фронтенда
router.get("/", async (req: Request, res: Response) => {
  try {
    const days = await DayStory.findAll();
    const mapped = days.map((d) => ({
      ...d.toJSON(),
      // Sequelize возвращает JSON объекты как строки в некоторых БД, поэтому можно парсить
      choices: d.choices ?? [],
      lesson: d.lesson ?? {},
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении историй" });
  }
});

// POST - добавить дни из массива (seed)
router.post("/seed", async (_req: Request, res: Response) => {
  try {
    const daysData = [
      {
        day: 1,
        title: "Первая зарплата",
        description: "Сегодня ты получил свою первую зарплату за подработку.",
        context: "У тебя в руках конверт с деньгами. Что ты сделаешь?",
        choices: [
          {
            id: "invest",
            text: "Отложить 50% на будущее",
            impact: { money: 150, energy: 0, mood: -10 },
          },
          {
            id: "spend",
            text: "Потратить на то, что хочется",
            impact: { money: -100, energy: 0, mood: 30 },
          },
          {
            id: "balance",
            text: "Отложить 20% и немного потратить",
            impact: { money: 50, energy: 0, mood: 10 },
          },
        ],
        lesson: {
          title: "Урок о деньгах",
          text: "Финансовая грамотность начинается с первого заработка. Откладывать деньги — это не ограничение, а инвестиция в будущее.",
          icon: "💰",
        },
      },
      {
        day: 2,
        title: "Экзамен близко",
        description: "Завтра важный экзамен, но друзья зовут на вечеринку.",
        context: "Твоя энергия на пределе. Как поступишь?",
        choices: [
          {
            id: "study",
            text: "Отказаться и готовиться к экзамену",
            impact: { money: 0, energy: -30, mood: -20 },
          },
          {
            id: "party",
            text: "Пойти на вечеринку и расслабиться",
            impact: { money: -50, energy: -40, mood: 40 },
          },
          {
            id: "quick-study",
            text: "Быстро повторить материал и лечь спать",
            impact: { money: 0, energy: 20, mood: 10 },
          },
        ],
        lesson: {
          title: "Урок о приоритетах",
          text: "Баланс между учебой и отдыхом важен, но иногда нужно жертвовать краткосрочным удовольствием ради долгосрочных целей.",
          icon: "📚",
        },
      },
    ];

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
