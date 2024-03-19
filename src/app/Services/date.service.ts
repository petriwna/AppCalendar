import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class DateService {
    private currentValueSubject: BehaviorSubject<string>;
    currentDate$: Observable<string>;

    constructor(
        private localStorageService: LocalStorageService,
        private datePipe: DatePipe
    ) {
        this.initializeCurrentValue();
    }

    private initializeCurrentValue(): void {
        const storedValueDate = this.localStorageService.getStoredValue("currentDate");
        const storedValueSelected = this.localStorageService.getStoredValue("selectedValue");

        this.currentValueSubject = new BehaviorSubject<string>(
            this.getFormat(storedValueSelected, storedValueDate) || this.setCurrentDateToday()
        );
        this.currentDate$ = this.currentValueSubject.asObservable();
    }

    getFormat(format: string, dateString: string): string {
        let value: string;

        switch (format) {
            case "month":
            case "week":
            case "period":
                value = this.formatDateToMonthYear(dateString);
                break;
            case "year":
                value = this.formatDateToYear(dateString);
                break;
            default:
                value = this.formatDateToDayMonthYear(dateString);
                break;
        }

        return value || "";
    }

    formatTodayDateToDayWeekDayMonth(): string {
        return this.datePipe.transform(new Date(), "EEEE, d MMMM") ?? "";
    }

    formatDateToDayMonthYear(value: string): string {
        return this.datePipe.transform(new Date(value), "d MMMM YYYY") ?? "";
    }

    formatDateToMonthYear(value: string): string {
        return this.datePipe.transform(new Date(value), "MMMM YYYY") ?? "";
    }

    formatDateToYear(value: string): string {
        return this.datePipe.transform(new Date(value), "YYYY") ?? "";
    }

    setCurrentDateToday(): string {
        const dateNow: string = (new Date()).toString();
        const currentDateToday = this.formatDateToDayMonthYear(dateNow);

        this.localStorageService.setStoredValue("currentDate", dateNow);
        this.currentValueSubject.next(dateNow);

        return currentDateToday;
    }

    setCurrentMonthToday(): string {
        const dateNow: string = (new Date()).toString();
        const currentMonthToday = this.formatDateToMonthYear(dateNow);

        this.localStorageService.setStoredValue("currentDate", dateNow);

        this.currentValueSubject.next(dateNow);

        return currentMonthToday;
    }

    setCurrentYearToday(): string {
        const currentDate = new Date();
        const formattedDate = this.formatDateToYear(currentDate.toString());

        this.localStorageService.setStoredValue("currentDate", currentDate.toString());
        this.currentValueSubject.next(currentDate.toString());

        return formattedDate;
    }

    nextDay(value: string): string {
        const date = new Date(value);

        date.setDate(date.getDate() + 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToDayMonthYear(currentDate);
    }

    nextMonth(value: string): string {
        const date = new Date(value);

        date.setMonth(date.getMonth() + 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToMonthYear(currentDate);
    }

    nextYear(value: string): string {
        const date = new Date(value);

        date.setFullYear(date.getFullYear() + 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToYear(currentDate);
    }

    prevDay(value: string): string {
        const date = new Date(value);

        date.setDate(date.getDate() - 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToDayMonthYear(currentDate);
    }

    prevMonth(value: string): string {
        const date = new Date(value);

        date.setMonth(date.getMonth() - 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToMonthYear(currentDate);
    }

    prevYear(value: string): string {
        const date = new Date(value);

        date.setFullYear(date.getFullYear() - 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToYear(currentDate);
    }
}
