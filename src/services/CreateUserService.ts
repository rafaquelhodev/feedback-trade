import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("Incorrect email");
        }

        const userExists = await usersRepository.findOne({
            email
        });

        if (userExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const newUser = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });
        await usersRepository.save(newUser);

        return newUser;
    }
}

export { CreateUserService }