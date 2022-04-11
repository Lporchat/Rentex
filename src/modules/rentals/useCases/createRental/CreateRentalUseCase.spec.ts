import dayjs from "dayjs";
import { DaysjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DaysjsDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DaysjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DaysjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "LTZ855-4234",
      fine_amount: 40,
      category_id: "2444",
      brand: "Brand",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User Already a Rental"));
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car Is Unavailable"));
  });

  it("Should not be able to create a new rental with a invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
