import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DaysjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const end_UTC = this.convertToUTC(end_date);
    const start_UTC = this.convertToUTC(start_date);
    return dayjs(end_UTC).diff(start_UTC, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_UTC = this.convertToUTC(end_date);
    const start_UTC = this.convertToUTC(start_date);
    return dayjs(start_UTC).diff(end_UTC, "days");
  }
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }
}

export { DaysjsDateProvider };
