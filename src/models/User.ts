import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class User extends Model {
  declare id: number;
  declare email: string;
  declare nickname: string;
  declare password: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "User" }
);
