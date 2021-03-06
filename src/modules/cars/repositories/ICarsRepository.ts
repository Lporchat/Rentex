import { ICreateCarDTO } from "../dtos/ICreateCars";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  updatedAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
