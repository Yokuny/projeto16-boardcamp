import { Router } from "express";
import route from "../controllers/rentals.controller.js";

const rentals = Router();

rentals.get("/rentals", route.getRentals);

rentals.post("/rentals", route.postRental);
rentals.post("/rentals/:id/return", route.postRentalFinish);
rentals.delete("/rentals/:id", route.deleteRental);

export default rentals;
