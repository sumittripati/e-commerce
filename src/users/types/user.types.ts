export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

export type CreateUserInput = Omit<User, "id" | "created_at">;

export type UpdateUserInput = Partial<CreateUserInput>;