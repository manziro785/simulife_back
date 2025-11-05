import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class DayStory extends Model {
  declare id: number;
  declare day: number;
  declare title: string;
  declare description: string;
  declare context: string;
  declare choices: object;
  declare lesson: object;
}

DayStory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    day: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    context: { type: DataTypes.STRING },
    choices: { type: DataTypes.JSONB },
    lesson: { type: DataTypes.JSONB },
  },
  { sequelize, modelName: "DayStory" }
);
