import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "New Car",
      description: "New Car",
      daily_rate: 1234,
      license_plate: "New Car",
      fine_amount: 1234,
      brand: "New Car",
      category_id: "New Car",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be not able to create a new car with exists", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "New Car",
        description: "New Car",
        daily_rate: 1234,
        license_plate: "New Car",
        fine_amount: 1234,
        brand: "New Car",
        category_id: "New Car",
      });
      await createCarUseCase.execute({
        name: "New Car",
        description: "New Car",
        daily_rate: 1234,
        license_plate: "New Car",
        fine_amount: 1234,
        brand: "New Car",
        category_id: "New Car",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "New Car",
      description: "New Car",
      daily_rate: 1234,
      license_plate: "New Car",
      fine_amount: 1234,
      brand: "New Car",
      category_id: "New Car",
    });

    expect(car.available).toBe(true);
  });
});
