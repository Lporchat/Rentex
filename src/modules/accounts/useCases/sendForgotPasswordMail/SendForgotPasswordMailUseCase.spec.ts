import { DaysjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DaysjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/InMemory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositorInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositorInMemory;
let dateProvider: DaysjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositorInMemory();
    dateProvider = new DaysjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot email", async () => {
    const send = await jest.spyOn(mailProvider, "sendMail");
    const tokenEmail = await jest.spyOn(usersTokensRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      drive_license: "666666",
      email: "lporchat06@gmail.com",
      name: "leonardo",
      password: "password",
    });

    await sendForgotPasswordUseCase.execute("lporchat06@gmail.com");

    expect(send).toBeCalled();
    expect(tokenEmail).toBeCalled();
  });

  it("should not be able to send a forgot email", async () => {
    await expect(
      sendForgotPasswordUseCase.execute("l6@gmail.com")
    ).rejects.toEqual(new AppError("User does not exist"));
  });
});
