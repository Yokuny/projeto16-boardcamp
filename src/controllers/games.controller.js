import db from "../database/database.connection.js";

const getGames = async (req, res) => {
  try {
    const response = await db.query(`SELECT * FROM games;`);
    res.send(response.rows);
  } catch {
    res.sendStatus(404);
  }
};

const postGame = async (req, res) => {
  const { name, image, stockTotal, pricePerDay } = req.body;
  try {
    const { rows } = await db.query("SELECT * FROM games WHERE name = $1 LIMIT 1;", [name]);
    console.log(rows);
    if (rows.length) return res.sendStatus(409);

    db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay")
      VALUES ($1, $2, $3, $4);`,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

export default { getGames, postGame };
