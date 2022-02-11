import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {


    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token Missing", 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userID } = verify(token, "a43026e61d992c91dc04df34b087fa62") as IPayload

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(userID);

        if (!user) {
            throw new AppError("User Does Not Exist", 401)
        }

        req.user = { id: userID }
        next();
    } catch {
        throw new AppError("Invalid Token", 401)
    }
}