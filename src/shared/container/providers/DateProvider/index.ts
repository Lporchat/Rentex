import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DaysjsDateProvider } from "./implementations/DaysjsDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DaysjsDateProvider);
