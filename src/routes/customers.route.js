import { Router } from "express";
import route from "../controllers/customers.controller.js";

const customers = Router();

customers.get("/customers", route.getCustomers);
customers.get("/customers/:id", route.getCustomer);
customers.post("/customers", route.postCustomer);
customers.put("/customers/:id", route.putCustomer);

export default customers;
