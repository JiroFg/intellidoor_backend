import { createPool } from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PWD, DB_PORT, DB_NAME } from "../config/config.js"

//Pool es una artefacto que nos proporciona mysql2 para crear una conexión que se queda abierta despues de utilizarla
//esto nos ayuda a reducir el tiempo entre solicitudes
const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  port: DB_PORT,
  database: DB_NAME
})

export { pool }