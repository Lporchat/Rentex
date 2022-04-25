
import { getRepository, Repository } from "typeorm";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, IcreateCategoryDTO } from "../../repositories/ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {

    // para so essa classe ter as funções da tablela "category"
    private repository: Repository<Category>;

    constructor() {
        //quando construir ter acesso as funções da classe
        this.repository = getRepository(Category);
    }


    async create({ name, description }: IcreateCategoryDTO): Promise<void> {
        // criando a entidade do category
        const category = this.repository.create({ name, description })
        // salvando no banco de dados
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository }