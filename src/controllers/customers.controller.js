import db from "../database/database.connection.js";
import dayjs from "dayjs";

export const getCustomers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM customers");
    if (rows) {
      const customers = rows.map((customer) => {
        return {
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
          cpf: customer.cpf,
          birthday: dayjs(customer.birthday).format("YYYY-MM-DD"),
        };
      });
      return res.status(200).send(customers);
    }
  } catch (err) {
    return res.sendStatus(err);
  }
};

export const getCustomer = async (req, res) => {
  const id = req.params.id;
  const idQuery = `SELECT * FROM customers WHERE id = $1 LIMIT 1;`;

  try {
    const { rows } = await db.query(idQuery, [id]);
    if (rows.length) {
      rows[0].birthday = dayjs(rows[0].birthday).format("YYYY-MM-DD");
      return res.status(200).send(rows[0]);
    }

    return res.sendStatus(404);
  } catch (err) {
    return res.sendStatus(err);
  }
};

export const postCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  const cpfQuery = `SELECT * FROM customers WHERE cpf = $1;`;
  const newQuery = `INSERT INTO customers (name, phone, cpf, birthday)
  VALUES ($1, $2, $3, $4)`;

  try {
    const { rows } = await db.query(cpfQuery, [cpf]);
    if (rows.length) return res.sendStatus(409);

    await db.query(newQuery, [name, phone, cpf, dayjs(birthday).format("YYYY-MM-DD")]);

    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(err);
  }
};

export const putCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  const id = req.params.id;
  const findQuery = `SELECT * FROM customers WHERE id = $1 AND cpf=$2 LIMIT 1;`;
  const cpfQuery = `SELECT * FROM customers WHERE cpf = $1 AND id <> $2;`;
  const updateQuery = `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`;

  try {
    const { rows } = await db.query(findQuery, [id, cpf]);
    if (!rows.length) return res.sendStatus(404);

    const anotherUser = await db.query(cpfQuery, [cpf, id]);
    if (anotherUser.rows.length > 0) return res.sendStatus(409);

    await db.query(updateQuery, [name, phone, cpf, dayjs(birthday).format("YYYY-MM-DD"), id]);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(err);
  }
};

export default { getCustomers, getCustomer, postCustomer, putCustomer };
