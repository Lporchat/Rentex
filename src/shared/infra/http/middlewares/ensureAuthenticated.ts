import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/repositories/UsersTokensRepository";
import auth from "../../../../config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const userTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token Missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refrash_token
    ) as IPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User Does Not Exist", 401);
    }

    req.user = { id: user_id };
    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}
