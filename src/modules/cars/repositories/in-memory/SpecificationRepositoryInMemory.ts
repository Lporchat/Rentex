import { Specification } from "../../infra/typeorm/entities/Specification";
import { IcreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {

    specifications: Specification[] = [];


    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specifications) => specifications.name === name);

    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) => ids.includes(specification.id));
        return allSpecifications
    }


    async create({ name, description }: IcreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, { name, description });
        this.specifications.push(specification);
        return specification;
    }


    async list(): Promise<Specification[]> {
        throw new Error("Method not implemented.");
    }

}

export { SpecificationRepositoryInMemory }