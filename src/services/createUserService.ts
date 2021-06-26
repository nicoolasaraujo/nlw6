import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/usersRepositories";
import { hash } from "bcryptjs"


interface IUserRequest {
    name: string;
    email: string;

    password: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, password, admin }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("Email incorrect!");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        const passwordHash = await hash(password, 8)

        console.log(passwordHash)

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }