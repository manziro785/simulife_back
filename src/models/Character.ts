import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Character extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare avatar: string;
  declare money: number;
  declare energy: number;
  declare mood: number;
}

Character.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    money: { type: DataTypes.INTEGER },
    energy: { type: DataTypes.INTEGER },
    mood: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "Character" }
);
