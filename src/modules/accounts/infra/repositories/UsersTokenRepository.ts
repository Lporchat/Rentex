import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUsersTokenDTO";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { UserTokens } from "../typeorm/entities/UserTokens";

class UsersTokenRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken;
    }
}


export { UsersTokenRepository }