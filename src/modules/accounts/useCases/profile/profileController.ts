import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUseCase } from "./profileUseCase";

class ProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const profileUseCase = container.resolve(ProfileUseCase);

    const user = await profileUseCase.execute(id);

    return res.json(user);
  }
}

export { ProfileController };
