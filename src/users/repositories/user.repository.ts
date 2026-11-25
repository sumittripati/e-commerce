import pool from "../../config/db";
import { CreateUserInput, User } from "../types/user.types";

// POST - Create user
export async function createUserRepo(
    data: CreateUserInput
): Promise<User> {

    const result = await pool.query<User>(
        `INSERT INTO users (name, email)
         VALUES ($1, $2)
         RETURNING *`,
        [data.name, data.email]
    );

    return result.rows[0];
}

// GET - Get all users
export async function getUserRepo(): Promise<User[]> {

    const result = await pool.query<User>(
        `SELECT * FROM users`
    );

    return result.rows;
}