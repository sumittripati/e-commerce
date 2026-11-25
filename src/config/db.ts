import dotenv from "dotenv";
dotenv.config()
import { Client, Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

pool.connect().then((Client) => {
    console.log("Database connected successfully!");
    Client.release();
}).catch((error) => {
    console.log("Database connection failed!", error.message)
})

export default pool
