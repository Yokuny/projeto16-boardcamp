import { Router } from "express";
import route from "../controllers/games.controller.js";

const games = Router();
games.get("/games", route.getGames);
games.post("/games", route.postGame);

export default games;
