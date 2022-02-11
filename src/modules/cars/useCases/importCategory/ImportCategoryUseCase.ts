import fs from "fs";
// por algum motivo desconsecido tenho que desmembrar o parce do csv parce
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategories {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {

        return new Promise((resolve, reject) => {
            const categories: IImportCategories[] = []

            // vai pegar o stream do arquivo depois vai inicializar o csv-parse e depois vai socar o stream no csv-parse
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();


            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line
                categories.push({
                    name, description
                })
            })
                .on("end", () => {
                    fs.promises.unlink(file.path)
                    resolve(categories)
                })
                .on("error", (error) => {
                    reject(error);
                })


        })

    }

    async execute(file: Express.Multer.File): Promise<void> {

        const categories = await this.loadCategories(file);


        //vai andar todo o array
        categories.map(async category => {
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(name);

            if (!existCategory) {
                await this.categoriesRepository.create({
                    name, description
                })
            }
        })

    }

}


export { ImportCategoryUseCase }


