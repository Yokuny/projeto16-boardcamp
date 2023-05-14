import db from "../database/database.connection.js";
import dayjs from "dayjs";

export const getCustomers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM customers");
    if (rows) return res.status(200).send(rows);
  } catch (err) {
    return res.sendStatus(err);
  }
};

export const getCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await db.query("SELECT * FROM customers WHERE id = $1 LIMIT 1;", [id]);
    if (rows.length) return res.status(200).send(rows[0]);
    return res.sendStatus(404);
  } catch (err) {
    return res.sendStatus(err);
  }
};

export const postCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  try {
    const { rows } = await db.query("SELECT * FROM customers WHERE cpf = $1 LIMIT 1;", [cpf]);
    if (rows.length) return res.sendStatus(409);

    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, dayjs(birthday).format("YYYY-MM-DD")]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(err);
  }
};

export const putCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  const id = req.params.id;
  try {
    const { rows } = await db.query("SELECT * FROM customers WHERE id = $1 LIMIT 1;", [id]);
    if (!rows.length) return res.sendStatus(404);

    const anotherUser = await db.query("SELECT * FROM customers WHERE cpf = $1;", [cpf]);
    if (anotherUser.rows.length > 1) return res.sendStatus(409);

    await db.query("UPDATE customers SET name = $1, phone = $2, cpf = $3 birthday = $4 WHERE id = $5;", [
      name,
      phone,
      cpf,
      dayjs(birthday).format("YYYY-MM-DD"),
      id,
    ]);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(err);
  }
};

export default { getCustomers, getCustomer, postCustomer, putCustomer };
