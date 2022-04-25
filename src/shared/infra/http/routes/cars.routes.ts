import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarControlle";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarController";
import { ListCarsController } from "../../../../modules/cars/useCases/listCar/ListCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const carsRoutes = Router();

const uploadAvatar = multer(uploadConfig)

const createCarController = new CreateCarController();
const listCarController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();



carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listCarController.handle)

carsRoutes.post("/specification/:car_id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, uploadAvatar.array("images"), uploadCarImageController.handle)

export { carsRoutes }