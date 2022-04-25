import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { RentalsRepository } from "../../infra/typeorm/repository/RentalsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
