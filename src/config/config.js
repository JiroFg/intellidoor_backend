import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3000
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PWD = process.env.DB_PWD
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const KEY = process.env.KEY

export { PORT, DB_HOST, DB_USER, DB_PWD, DB_PORT, DB_NAME, KEY }