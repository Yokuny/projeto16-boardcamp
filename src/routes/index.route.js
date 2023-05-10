import { Router } from "express";
import first from "./first.route.js";
import second from "./second.route.js";

const router = Router();

router.use(first);
router.use(second);

export default router;
