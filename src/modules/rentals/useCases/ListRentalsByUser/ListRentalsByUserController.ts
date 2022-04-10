import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listRentalsUserUseCase = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listRentalsUserUseCase.execute(id);

    return res.json(rentals);
  }
}

export { ListRentalsByController };
