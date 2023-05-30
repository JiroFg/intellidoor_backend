import { createPool } from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PWD, DB_PORT, DB_NAME } from "../config/config.js"
import { createConnection } from "mysql2";

const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  port: DB_PORT,
  database: DB_NAME
})

const connection = createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  port: DB_PORT,
  database: DB_NAME
})

export { pool, connection }