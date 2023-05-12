import db from "../database/database.connection.js";

export const getCustomers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM customers");
    if (rows) return res.status(200).send(rows);
  } catch (err) {
    console.log("<<<<<<<< erro");
    console.log(err);
  }
};

export const getCustomer = async (req, res) => {
  const { id } = req.query;
  console.log("id>>");
  console.log(id);
  res.status(200).send(customerToFind);
};

export const postCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  try {
    const { rows } = await db.query("SELECT * FROM customers WHERE name = $1 LIMIT 1;", [name]);
    if (rows.length) return res.sendStatus(409);

    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );
    res.status(201).send("termino");
  } catch (err) {
    console.log("<<<<<<<< erro");
    console.log(err);
  }
};

const customerToChange = {
  name: "João Alfredo",
  phone: "21998899222",
  cpf: "01234567890",
  birthday: "1992-10-05",
};

export const putCustomer = async (req, res) => {
  res.status(200).send(customerToChange);
};

export default { getCustomers, getCustomer, postCustomer, putCustomer };
