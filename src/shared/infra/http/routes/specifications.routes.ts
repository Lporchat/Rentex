import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "../../../../modules/cars/useCases/listSpecification/ListSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";



const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

// para caso queira usar em todas as rotas
// specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/",ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

// specificationRoutes.get("/", listSpecificationController.handle)

export { specificationRoutes };


