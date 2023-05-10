import { Router } from "express";
import controller from "../controllers/second.controller.js";

const second = Router();
second.get("/a", controller.getSecond);
second.post("/a", controller.postSecond);

export default second;
