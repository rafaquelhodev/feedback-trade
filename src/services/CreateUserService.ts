import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
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

        const newUser = usersRepository.create({
            name, email, admin
        });
        await usersRepository.save(newUser);

        return newUser;
    }
}

export { CreateUserService }