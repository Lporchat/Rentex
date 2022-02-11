import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

class ListCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { brand, category_id, name } = req.query;

        const listAvaliable = container.resolve(ListCarsUseCase);

        const cars = await listAvaliable.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string
        })

        return res.json(cars);
    }
}

export { ListCarsController }