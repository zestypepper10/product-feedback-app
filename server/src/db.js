import pg from "pg";
import config from "./config.js";

const { Pool } = pg;

// A single shared connection pool used by every query in this app.
export const pool = new Pool({
  connectionString: config.databaseUrl,
});