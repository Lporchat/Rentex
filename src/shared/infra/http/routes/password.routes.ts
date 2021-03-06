import { Router } from "express";
import { ResetPasswordUserController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);
passwordRouter.post("/reset", resetPasswordController.handle);

export { passwordRouter };
