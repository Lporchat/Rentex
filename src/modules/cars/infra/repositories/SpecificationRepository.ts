import { getRepository, Repository } from "typeorm";
import { Specification } from "../typeorm/entities/Specification";
import { IcreateSpecificationDTO, ISpecificationRepository } from "../../repositories/ISpecificationRepository";


class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications
    }

    async create({ name, description }: IcreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        const category = this.repository.create({ name, description })
        // salvando no banco de dados
        await this.repository.save(category);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }
}

export { SpecificationRepository }