import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/usersRepositories"
import { sign } from "jsonwebtoken"
interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password incorrect")
        }


        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email,
        },
            "bce89cfec2a35d6621e59e5bc7c18981",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService }