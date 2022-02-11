import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { SpecificationRepository } from "../../infra/repositories/SpecificationRepository";



@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: SpecificationRepository) {
    }

    async execute(): Promise<Specification[]>  {
        const specification = await this.specificationRepository.list();
        return specification

    }
}


export { ListSpecificationUseCase }