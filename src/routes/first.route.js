import { Router } from "express";
import controller from "../controllers/first.controller.js";

const first = Router();
first.get("/", controller.getFirst);
first.post("/", controller.postFirst);

export default first;
