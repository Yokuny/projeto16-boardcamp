import { Router } from "express";
import route from "../controllers/games.controller.js";
import gamesSchema from "../schemas/games.schema.js";
import validate from "../middlewares/data.middleware.js";
import imageValidate from "../middlewares/image.middleware.js";

const games = Router();

games.get("/games", route.getGames);
games.post("/games", validate(gamesSchema), imageValidate(), route.postGame);

export default games;
