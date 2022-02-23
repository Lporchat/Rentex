import { AppError } from "../../../../shared/errors/AppError";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimunHours = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car Is Unavailable");
    }
    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("User Already a Rental");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimunHours) {
      throw new AppError("Invalid return time");
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
