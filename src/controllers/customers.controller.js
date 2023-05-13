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
  const id = req.params.id;
  try {
    const { rows } = await db.query("SELECT * FROM customers WHERE id = $1 LIMIT 1;", [id]);
    if (rows.length) return res.status(200).send(rows[0]);
    return res.sendStatus(404);
  } catch (err) {
    console.log("<<<<<<<< erro");
    console.log(err);
  }
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
    return res.status(201).send("termino");
  } catch (err) {
    console.log("<<<<<<<< erro");
    console.log(err);
  }
};

export const putCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  const id = req.params.id;
  try {
    const { rows } = await db.query("SELECT * FROM customers WHERE id = $1 LIMIT 1;", [id]);
    if (!rows.length) return res.sendStatus(404);
    const user = rows[0];
  } catch (err) {
    console.log("Errro <><><><><><>");
  }
};

export default { getCustomers, getCustomer, postCustomer, putCustomer };
