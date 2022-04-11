import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositorInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositorInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate user", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositorInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it('shoult be able to authenticate an user', async () => {
        const user = {
            drive_license: '000123',
            email: 'user@hotmail.com',
            password: '12345678',
            name: 'userTest'
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });


        expect(result).toHaveProperty('token')
    })


    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(authenticateUserUseCase.execute({ email: 'email@email.com', password: '12345678' })
        ).rejects.toEqual(new AppError("Password or Email Incorrect"));
    })


    it('should not be able to authenticate with icorrent password', async () => {
        const user = {
            drive_license: '000123',
            email: 'user@hotmail.com',
            password: '12345678',
            name: 'userTest'
        }

        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: '123123123',
            })
        ).rejects.toEqual(new AppError("Password or Email Incorrect"));
    })
})

