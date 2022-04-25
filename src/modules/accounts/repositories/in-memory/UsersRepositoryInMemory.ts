import { Category } from "../../../cars/infra/typeorm/entities/Category";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepositorInMemory implements IUsersRepository {


    users: User[] = [];

    async create({ drive_license, email, password, name }: ICreateUserDTO): Promise<void> {

        const user = new User()

        Object.assign(user, { drive_license, email, password, name })
        this.users.push(user)

    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }


}

export { UserRepositorInMemory }