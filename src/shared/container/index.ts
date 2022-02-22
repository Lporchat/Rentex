import { container } from "tsyringe";

import "../container/providers";

import { UsersRepository } from "../../modules/accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/repositories/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { CategoriesRepository } from "../../modules/cars/infra/repositories/CategoriesRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/repositories/CarsRepository";
import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "../../modules/cars/infra/repositories/CarsImagesRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repository/RentalsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);
