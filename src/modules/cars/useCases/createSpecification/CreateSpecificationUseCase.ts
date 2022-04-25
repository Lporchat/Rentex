import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

// Modelo de request
interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    // é feito para que toda vez que se crie um instacia da classe ela precise dar o repository

    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository) {
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);


        if (specificationAlreadyExists) {
            throw new AppError("Specifiction already exists")
        }

        this.specificationRepository.create({ name, description });
    }
}


export { CreateSpecificationUseCase }

