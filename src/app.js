import router from "./routes/index.route.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

dotenv.config();

server.listen(process.env.PORT);