// scripts/migrateNicknames.ts
import sequelize from "../db";
import { User } from "../models/User";
import { QueryInterface } from "sequelize";

async function migrateNicknames() {
  try {
    await sequelize.authenticate();
    console.log("Подключение к БД успешно");

    const queryInterface: QueryInterface = sequelize.getQueryInterface();

    // Проверяем, существует ли колонка nickname
    const tableDescription = await queryInterface.describeTable("Users");

    if (!tableDescription.nickname) {
      console.log("Добавляем колонку nickname...");
      await queryInterface.addColumn("Users", "nickname", {
        type: "VARCHAR(255)",
        allowNull: true,
      });
      console.log("Колонка nickname добавлена");
    } else {
      console.log("Колонка nickname уже существует");
    }

    // Получаем всех пользователей без nickname
    const users = await User.findAll({
      where: { nickname: null },
      raw: true,
    });

    console.log(`Найдено ${users.length} пользователей без nickname`);

    // Обновляем каждого пользователя
    for (const user of users) {
      const defaultNickname = `user${user.id}`;
      await sequelize.query(
        `UPDATE "Users" SET "nickname" = :nickname WHERE "id" = :id`,
        {
          replacements: { nickname: defaultNickname, id: user.id },
        }
      );
      console.log(`Обновлен пользователь ${user.email} -> ${defaultNickname}`);
    }

    // Делаем колонку NOT NULL
    if (users.length > 0 || tableDescription.nickname?.allowNull !== false) {
      console.log("Устанавливаем NOT NULL для nickname...");
      await queryInterface.changeColumn("Users", "nickname", {
        type: "VARCHAR(255)",
        allowNull: false,
      });
      console.log("Колонка nickname теперь NOT NULL");
    }

    console.log("Миграция завершена успешно!");
    process.exit(0);
  } catch (error) {
    console.error("Ошибка миграции :", error);
    process.exit(1);
  }
}

migrateNicknames();
