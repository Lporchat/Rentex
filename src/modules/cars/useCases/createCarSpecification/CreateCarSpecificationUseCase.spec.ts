import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


let createCarSpecificationUsecase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specificartion', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUsecase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
    })

    it('should create a new car specificartion', async () => {

        const car = await carsRepositoryInMemory.create({
            name: 'New Car',
            description: 'New Car',
            daily_rate: 1234,
            license_plate: 'New Car',
            fine_amount: 1234,
            brand: 'New Car',
            category_id: 'New Car'
        })

        const specification = await specificationsRepositoryInMemory.create({ description: 'New Car', name: 'TEste' })

        const specifications_id = [specification.id]

        const specificationsCars = await createCarSpecificationUsecase.execute({ car_id: car.id, specifications_id })

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1)
    })

    it('should not be create a new car specificartion', async () => {

        const car_id = '1234'
        const specifications_id = ['54321']
        await expect(createCarSpecificationUsecase.execute({ car_id, specifications_id })
        ).rejects.toEqual(new AppError('Car not exist'));
    })
})