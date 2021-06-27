import { Request, Response } from "express"
import { ListUserSendComplimentsService } from "../services/listUserSendComplimentsService"

class ListUserSendComplimentsController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const listSendComplimentsService = new ListUserSendComplimentsService();

        const compliments = await listSendComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserSendComplimentsController }