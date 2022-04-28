import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import aws from "aws-sdk";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

@injectable()
class SesMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.createClient();
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br",
      subject,
      html: templateHTML,
    });

  }

  private async createClient() {
    try {
      this.client = nodemailer.createTransport({
        SES: new aws.SES({
          //api que sera utilizada
          apiVersion: "2010-12-01",
          //modificar de acordo com o serviço de SES utilizado
          region: process.env.AWS_BUCKET_REGION
        }),
      });
    } catch (err) {
      console.error(`SesMailProvider - Error:\n${err}`);
    }
  }
}
export { SesMailProvider };
