import { Router } from "express";
import games from "./games.route.js";
import customers from "./customers.route.js";
import rentals from "./rentals.route.js";

const router = Router();

router.use(games);
router.use(customers);
router.use(rentals);

export default router;
