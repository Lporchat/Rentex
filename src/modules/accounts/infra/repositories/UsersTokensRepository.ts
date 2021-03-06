import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUsersTokenDTO";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { UserTokens } from "../typeorm/entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token: refreshToken,
    });

  return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ refresh_token: token });
    return userToken;
  }
}

export { UsersTokensRepository };
