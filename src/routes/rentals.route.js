import { Router } from "express";
import route from "../controllers/rentals.controller.js";
import rentalSchema from "../schemas/rentals.schema.js";
import validate from "../middlewares/data.middleware.js";

const rentals = Router();

rentals.get("/rentals", route.getRentals);
rentals.post("/rentals", validate(rentalSchema), route.postRental);
rentals.post("/rentals/:id/return", route.postRentalFinish);
rentals.delete("/rentals/:id", route.deleteRental);

export default rentals;
