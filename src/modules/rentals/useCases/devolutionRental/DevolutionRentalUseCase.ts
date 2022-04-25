import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/entities/Rental";

interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exist");
    }

    const datenow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, datenow);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const dalay = this.dateProvider.compareInDays(
      datenow,
      rental.expected_return_date
    );

    

    let total = 0;

    if (dalay > 0) {
      const calculate_fine = dalay * car.fine_amount;
      total = calculate_fine;
    }


    total += daily * car.daily_rate;

    rental.end_date = datenow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updatedAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
