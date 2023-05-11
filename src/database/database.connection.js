import pg from "pg";
import { config } from "dotenv";
config();

const dbName = "boardcamp";

const connection = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  database: dbName,
});
export default connection;
