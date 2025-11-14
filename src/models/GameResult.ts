import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class GameResult extends Model {
  declare id: number;
  declare userId: number;
  declare characterId: number;
  declare mood: number;
  declare money: number;
  declare energy: number;
  declare completedAt: Date;
}

GameResult.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Characters", key: "id" },
    },
    mood: { type: DataTypes.INTEGER, allowNull: false },
    money: { type: DataTypes.INTEGER, allowNull: false },
    energy: { type: DataTypes.INTEGER, allowNull: false },
    completedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "GameResult",
    indexes: [{ unique: true, fields: ["userId", "characterId"] }],
  }
);
