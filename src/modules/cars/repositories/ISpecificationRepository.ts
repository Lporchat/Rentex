import { Specification } from "../infra/typeorm/entities/Specification";

interface IcreateSpecificationDTO {
    name: string;
    description: string;
}


interface ISpecificationRepository {
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>
    create({ name, description }: IcreateSpecificationDTO): Promise<Specification>;
    list(): Promise<Specification[]>,

}

export { ISpecificationRepository, IcreateSpecificationDTO }