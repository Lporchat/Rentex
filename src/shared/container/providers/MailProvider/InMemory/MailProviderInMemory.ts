import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private menssage: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.menssage.push(to, subject, variables, path);
  }
}

export { MailProviderInMemory };
