import { AppError } from "../../../../shared/errors/AppError";
import { IRentalsRepostitory } from "../../repositories/IRentalsRepostitory";
import { Rental } from "../../infra/typeorm/entities/Rental";

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase{

    constructor(private rentalRepository: IRentalsRepostitory){}

    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rental>{
        const minimunHours = 24; 

        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car Is Unavailable")
        }
        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("User Already a Rental")
        }

        const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format();
        const dateNow = dayjs().utc().local().format();

        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

        if(compare < minimunHours){
            throw new AppError("Invalid return time")
        }
        

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental
    }
}


export {CreateRentalUseCase}