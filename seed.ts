import sequelize from "./src/db";
import { Character } from "./src/models/Character";
import { DayStory } from "./src/models/DayStoty";
import { charactersData } from "./src/data/characters";
import { daysData } from "./src/data/dayStories";

const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("База данных синхронизирована");

    for (const c of charactersData) {
      await Character.create({
        id: c.id,
        name: c.name,
        description: c.description,
        avatar: c.avatar,
        money: c.stats.money,
        energy: c.stats.energy,
        mood: c.stats.mood,
      });
    }

    console.log("Characters добавлены");

    for (const d of daysData) {
      await DayStory.create({
        day: d.day,
        title: d.title,
        description: d.description,
        context: d.context,
        choices: d.choices,
        lesson: d.lesson,
      });
    }

    console.log("DayStories добавлены");
    process.exit(0);
  } catch (err) {
    console.error("Ошибка при сидировании:", err);
    process.exit(1);
  }
};

seed();
