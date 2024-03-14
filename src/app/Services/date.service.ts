import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class DateService {
    private currentValueSubject: BehaviorSubject<string>;
    currentDate$: Observable<string>;

    constructor(private localStorageService: LocalStorageService) {
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

    getFormat(format: string, date: string): string {
        let value: string;

        switch (format) {
            case "month":
            case "week":
            case "period":
                value = this.formatDateToMonthYear(date);
                break;
            case "year":
                value = this.formatDateToYear(date);
                break;
            default:
                value = this.formatDateToDayMonthYear(date);
                break;
        }

        return value || "";
    }

    formatTodayDateToDayWeekDayMonth(): string {
        const dateNow: Date = new Date();

        return `${this.getDayOfWeekName(dateNow.getDay())}, ${dateNow.getDate()} ${this.getMonthName(dateNow.getMonth())}`;
    }

    formatDateToDayMonthYear(value: string): string {
        const date = new Date(value);

        return `${date.getDate()} ${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    }

    formatDateToMonthYear(value: string): string {
        const date = new Date(value);

        return `${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    }

    formatDateToYear(value: string): string {
        const date = new Date(value);

        return `${date.getFullYear()}`;
    }

    updateFormatCurrentDate(selectedValue: string, currentDate: string): string {
        return this.getFormat(selectedValue, currentDate);
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

    nextYear(value: string): string {
        const date = new Date(value);

        date.setFullYear(date.getFullYear() + 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToYear(currentDate);
    }

    prevYear(value: string): string {
        const date = new Date(value);

        date.setFullYear(date.getFullYear() - 1);

        const currentDate = date.toString();

        this.localStorageService.setStoredValue("currentDate", currentDate);
        this.currentValueSubject.next(currentDate);

        return this.formatDateToYear(currentDate);
    }

    private getMonthName(month: number): string {
        const months: string[] = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return months[month];
    }

    private getDayOfWeekName(dayWeek: number): string {
        const daysOfWeek: string[] = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        return daysOfWeek[dayWeek];
    }
}
