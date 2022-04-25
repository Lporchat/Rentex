import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });
        return user
    }


    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user
    }


    async create({ name, email, drive_license, password, avatar, id }: ICreateUserDTO): Promise<void> {

        const user = this.repository.create({
            name, email, drive_license, password, avatar, id
        });

        await this.repository.save(user);
    }

}

export { UsersRepository }