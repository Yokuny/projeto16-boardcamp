import db from "../database/database.connection.js";
import dayjs from "dayjs";

export const getRentals = async (req, res) => {};

export const postRental = async (req, res) => {
  const { customerId, gameId, daysRented } = req.body;
  try {
    const checkGame = `SELECT * FROM games WHERE id = $1;`;
    const { rows: game } = await db.query(checkGame, [gameId]);
    if (!game.length) return res.sendStatus(400);

    const checkClient = `SELECT * FROM customers WHERE id = $1;`;
    const { rows: client } = await db.query(checkClient, [customerId]);
    if (!client.length) return res.sendStatus(400);

    const checkAmount = `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`;
    const { rows: amount } = await db.query(checkAmount, [gameId]);
    if (amount.length >= game[0].stockTotal) return res.sendStatus(400);

    const newRental = `INSERT INTO rentals ("customerId", "gameId","rentDate", "daysRented", "originalPrice")
    VALUES ($1,$2,$3,$4,$5)`;
    await db.query(newRental, [
      customerId,
      gameId,
      dayjs().format("YYYY-MM-DD"),
      daysRented,
      daysRented * game[0].pricePerDay,
    ]);

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const postRentalFinish = async (req, res) => {};

export const deleteRental = async (req, res) => {};

export default { getRentals, postRental, postRentalFinish, deleteRental };
