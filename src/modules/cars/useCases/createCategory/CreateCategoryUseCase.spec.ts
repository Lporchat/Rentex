import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriresRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepository: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    categoriesRepository = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category name test",
      description: "Category description test",
    };

    await categoriesRepository.execute(category);
    const categoryCreate = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreate).toHaveProperty("id");
  });

  it("should not be able to create a new category w ith name exist", async () => {
    expect(async () => {
      const category = {
        name: "Category name test",
        description: "Category description test",
      };

      await categoriesRepository.execute(category);
      await categoriesRepository.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
