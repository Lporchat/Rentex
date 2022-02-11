import dayjs from 'dayjs';

import { AppError } from "../../../../shared/errors/AppError";
import { RentalRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase; 
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
describe("Create Rental", () => {
    const daysAdd24Hour = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });


    it("should be able to create a new rental", async() => {
        const rental = await createRentalUseCase.execute({
            user_id: "12346",
            car_id: "121212",
            expected_return_date: daysAdd24Hour
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should be not able to create a new rental if there is another open to the same user", async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12346",
                car_id: "121212",
                expected_return_date: daysAdd24Hour
            });
    
            const rental = await createRentalUseCase.execute({
                user_id: "12346",
                car_id: "121212",
                expected_return_date: daysAdd24Hour
            })
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should be not able to create a new rental if there is another open to the same car", async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "teste",
                expected_return_date: daysAdd24Hour
            });
    
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "teste",
                expected_return_date: daysAdd24Hour
            })
        }).rejects.toBeInstanceOf(AppError)
    });


})