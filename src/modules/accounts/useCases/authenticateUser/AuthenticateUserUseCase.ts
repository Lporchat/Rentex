import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: { name: string, email: string, },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(@inject("UsersRepository")
    private usersRepository: IUsersRepository
    ) { }


    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Password or Email Incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Password or Email Incorrect")
        }

        const token = sign({}, "a43026e61d992c91dc04df34b087fa62", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token
        }

        return tokenReturn;
    }
}


export { AuthenticateUserUseCase }