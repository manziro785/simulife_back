import { User } from "./User";
import { Character } from "./Character";
import { GameResult } from "./GameResult";

// Связи
GameResult.belongsTo(User, { foreignKey: "userId" });
User.hasMany(GameResult, { foreignKey: "userId" });

GameResult.belongsTo(Character, { foreignKey: "characterId" });
Character.hasMany(GameResult, { foreignKey: "characterId" });

export { User, Character, GameResult };
