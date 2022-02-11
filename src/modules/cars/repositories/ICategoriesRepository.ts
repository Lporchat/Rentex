import { Category } from "../infra/typeorm/entities/Category";


// modelo
interface IcreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>,
    create({ name, description }: IcreateCategoryDTO): Promise<void>;
}


export { ICategoriesRepository, IcreateCategoryDTO }