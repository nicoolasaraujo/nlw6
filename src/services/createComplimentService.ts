import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/complimentsRepositories"
import { UsersRepositories } from "../repositories/usersRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string
}


class CreateComplimentService {
    async execute({ tag_id, message, user_receiver, user_sender }: IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const userRepositories = getCustomRepository(UsersRepositories);

        const userReceiverExists = await userRepositories.findOne(user_receiver);

        if (user_receiver === user_sender) {
            throw new Error("Incorrect User Receiver");
        }

        if (!userReceiverExists) {
            throw new Error("User receiver does not exists!");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentsRepositories.save(compliment);

        return compliment;

    }
}

export { CreateComplimentService }