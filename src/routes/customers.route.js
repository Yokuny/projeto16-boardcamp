import { Router } from "express";
import route from "../controllers/customers.controller.js";
import customersSchema from "../schemas/customers.schema.js";
import validate from "../middlewares/data.middleware.js";
const customers = Router();

customers.get("/customers", route.getCustomers);
customers.get("/customers/:id", route.getCustomer);
customers.post("/customers", validate(customersSchema), route.postCustomer);
customers.put("/customers/:id", validate(customersSchema), route.putCustomer);

export default customers;
