import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"


let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it('should be able to list all cars avaliable', async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Audi 1",
            "description": "descrição",
            "daily_rate": 150,
            "license_plate": "xxxx-xxxx",
            "fine_amount": 150,
            "brand": "aeeeee",
            "category_id": "4bc7f447-b5b3-4bca-bd66-02dcce611400"
        })



        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car])
    })


    it('should be able to list all cars avaliable by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Audi 1",
            "description": "descrição",
            "daily_rate": 150,
            "license_plate": "xxxx-xxxx",
            "fine_amount": 150,
            "brand": "aasd",
            "category_id": "4bc7f447-b5b3-4bca-bd66-02dcce611400"
        })

        const car1 = await carsRepositoryInMemory.create({
            "name": "Audi 1",
            "description": "descrição",
            "daily_rate": 150,
            "license_plate": "xxxx-xxxx",
            "fine_amount": 150,
            "brand": "dd",
            "category_id": "4bc7f447-b5b3-4bca-bd66-02dcce611400"
        })



        const cars = await listCarsUseCase.execute({
            brand: "aasd",

        });

    })

    it('should be able to list all cars avaliable by name', async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Audi 1",
            "description": "descrição",
            "daily_rate": 150,
            "license_plate": "xxxx-xxxx",
            "fine_amount": 150,
            "brand": "aasd",
            "category_id": "4bc7f447-b5b3-4bca-bd66-02dcce611400"
        })

        const car1 = await carsRepositoryInMemory.create({
            "name": "Audi 1",
            "description": "descrição",
            "daily_rate": 150,
            "license_plate": "xxxx-xxxx",
            "fine_amount": 150,
            "brand": "dd",
            "category_id": "4bc7f447-b5b3-4bca-bd66-02dcce611400"
        })



        const cars = await listCarsUseCase.execute({
            name: "Audi 1",

        });

    })

    it('should be able to list all cars avaliable by name', async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Audi 1",
            "description": "descrição",
            "daily_rate": 150,
            "license_plate": "xxxx-xxxx",
            "fine_amount": 150,
            "brand": "aasd",
            "category_id": "4bc7f447-b5b3-4bca-bd66-02dcce611400"
        })

        const car1 = await carsRepositoryInMemory.create({
            "name": "Audi 1",
            "description": "descrição",
            "daily_rate": 150,
            "license_plate": "xxxx-xxxx",
            "fine_amount": 150,
            "brand": "dd",
            "category_id": "4bc7f447-b5b3-4bca-bd66-02dcce611400"
        })



        const cars = await listCarsUseCase.execute({
            category_id: "4bc7f447-b5b3-4bca-bd66-02dcce611400",

        });
    })

})