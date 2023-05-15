import db from "../database/database.connection.js";
import dayjs from "dayjs";

//services
async function getRentalsFromDb() {
  const searchQuery = `
    SELECT r.*, c.name AS clientName, g.name AS gameName 
    FROM rentals AS r
    JOIN customers AS c ON c.id = r."customerId"
    JOIN games AS g ON g.id = r."gameId";
  `;
  const { rows } = await db.query(searchQuery);
  return rows;
}
function formatRentalData(data) {
  return data.map((obj) => ({
    id: obj.id,
    customerId: obj.customerId,
    gameId: obj.gameId,
    rentDate: dayjs(obj.rentDate).format("YYYY-MM-DD"),
    daysRented: obj.daysRented,
    returnDate: obj.returnDate,
    originalPrice: obj.originalPrice,
    delayFee: obj.delayFee,
    customer: {
      id: obj.customerId,
      name: obj.clientName,
    },
    game: {
      id: obj.gameId,
      name: obj.gameName,
    },
  }));
}
export const getRentals = async (req, res) => {
  try {
    const data = await getRentalsFromDb();
    const formattedData = formatRentalData(data);
    res.send(formattedData).status(200);
  } catch {
    console.error(err);
    res.sendStatus(500);
  }
};
// <<<<
//services
const getGameById = async (gameId) => {
  const query = `SELECT * FROM games WHERE id = $1;`;
  const { rows } = await db.query(query, [gameId]);
  return rows.length ? rows[0] : null;
};

const getClientById = async (clientId) => {
  const query = `SELECT * FROM customers WHERE id = $1;`;
  const { rows } = await db.query(query, [clientId]);
  return rows.length ? rows[0] : null;
};

const getRentedGamesByGameId = async (gameId) => {
  const query = `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`;
  const { rows } = await db.query(query, [gameId]);
  return rows;
};

const insertRental = async (rental) => {
  const query = `INSERT INTO rentals ("customerId", "gameId","rentDate", "daysRented", "originalPrice")
    VALUES ($1,$2,$3,$4,$5)`;
  await db.query(query, [
    rental.customerId,
    rental.gameId,
    rental.rentDate,
    rental.daysRented,
    rental.originalPrice,
  ]);
};
export const postRental = async (req, res) => {
  const { customerId, gameId, daysRented } = req.body;
  try {
    const game = await getGameById(gameId);
    if (!game) return res.sendStatus(400);

    const client = await getClientById(customerId);
    if (!client) return res.sendStatus(400);

    const rentedGames = await getRentedGamesByGameId(gameId);
    if (rentedGames.length >= game.stockTotal) return res.sendStatus(400);

    const rental = {
      customerId,
      gameId,
      rentDate: dayjs().format("YYYY-MM-DD"),
      daysRented,
      originalPrice: daysRented * game.pricePerDay,
    };
    await insertRental(rental);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
// <<<<
//services
const calculateDelayFee = (rentDate, returnDate, originalPrice, daysRented) => {
  const pricePerDay = originalPrice / daysRented;
  const dayPast = returnDate.diff(rentDate, "day");
  return dayPast > daysRented ? (dayPast - daysRented) * pricePerDay : 0;
};

export const postRentalFinish = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: rent } = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);

    if (!rent.length) return res.sendStatus(404);

    if (rent[0].returnDate) return res.sendStatus(400);

    const rentDate = dayjs(rent[0].rentDate);
    const delayFee = calculateDelayFee(rentDate, dayjs(), rent[0].originalPrice, rent[0].daysRented);

    const query = `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`;
    await db.query(query, [dayjs().format("YYYY-MM-DD"), delayFee, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const deleteRental = async (req, res) => {};

export default { getRentals, postRental, postRentalFinish, deleteRental };
