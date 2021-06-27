import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    // Receber o token
    const authToken = request.headers.authorization

    // Validar se o token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
        // Validar se token é válido
        const { sub } = verify(token, "bce89cfec2a35d6621e59e5bc7c18981") as IPayload;

        request.user_id = sub;

        return next();
    } catch (erro) {
        return response.status(401).end();
    }


    // TODO: Recuperar informações do usuário

    return next;
}
