import * as userRepository from "../repositories/user.repository";
import { CreateUserInput, User } from "../types/user.types";

// POST
export async function createUserService(
    data: CreateUserInput
): Promise<User> {

    return await userRepository.createUserRepo(data);
}

// GET
export async function getUserService(): Promise<User[]> {

    return await userRepository.getUserRepo();
}