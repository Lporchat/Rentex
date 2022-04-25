import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DaysjsDateProvider } from "./DateProvider/implementations/DaysjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DaysjsDateProvider);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: new LocalStorageProvider(),
  S3: new S3StorageProvider(),
};

container.registerInstance<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);
