import { ICreateUserTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refreshToken: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;

  findByRefreshToken(token: string): Promise<UserTokens>
}

export { IUsersTokensRepository };
