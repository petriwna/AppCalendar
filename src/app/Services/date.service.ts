import { Injectable } from "@angular/core";
import {
    BehaviorSubject, Observable
} from "rxjs";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class DateService {
    private currentValueSubject: BehaviorSubject<Date>;
    currentDate$: Observable<Date>;

    constructor(
        private localStorageService: LocalStorageService,
    ) {
        this.currentValueSubject = new BehaviorSubject<Date>(new Date());
        this.currentDate$ = this.currentValueSubject.asObservable();
        this.initializeCurrentValue();
    }

    private initializeCurrentValue(): void {
        const storedValueDate = this.localStorageService.getStoredValue("currentDate");
        const initialDate = storedValueDate ? new Date(storedValueDate) : new Date();

        this.setCurrentDate(initialDate);
    }

    setCurrentDate(date: Date | null): void {
        let currentDate;

        if (date instanceof Date) {
            currentDate = date;
        } else {
            currentDate = new Date();
        }
        this.localStorageService.setStoredValue("currentDate", currentDate.toISOString());
        this.currentValueSubject.next(currentDate);
    }

    today() {
        this.setCurrentDate(new Date());
    }

    next(format: string): void {
        const currentDate: Date = this.currentValueSubject.value;

        switch (format) {
            case "Month":
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case "Week":
                currentDate.setDate(currentDate.getDate() + 7);
                break;
            case "Year":
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
            default:
                currentDate.setDate(currentDate.getDate() + 1);
        }
        this.setCurrentDate(currentDate);
    }

    prev(format: string): void {
        const currentDate: Date = this.currentValueSubject.value;

        switch (format) {
            case "Month":
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
            case "Week":
                currentDate.setDate(currentDate.getDate() - 7);
                break;
            case "Year":
                currentDate.setFullYear(currentDate.getFullYear() - 1);
                break;
            default:
                currentDate.setDate(currentDate.getDate() - 1);
        }
        this.setCurrentDate(currentDate);
    }

    getWeekDates(date: Date): Date[] {
        const firstDayOfWeek = new Date(date);

        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());

        const lastDayOfWeek = new Date(firstDayOfWeek);

        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

        const weekDates: Date[] = [];

        for (let currentDate = new Date(firstDayOfWeek); currentDate <= lastDayOfWeek; currentDate.setDate(currentDate.getDate() + 1)) {
            weekDates.push(new Date(currentDate));
        }

        return weekDates;
    }

    getWeeksInMonth(date: Date): Date[][] {
        const currentMonth: number = date.getMonth();
        const year: number = date.getFullYear();
        const month: { week: Date[][] } = { week: [] };
        let firstDate: number = new Date(year, currentMonth, 1).getDate();
        const lastDate: number = new Date(year, currentMonth + 1, 0).getDate();

        for (let i: number = 0; i < Math.ceil(lastDate / 7); i++) {
            date.setDate(firstDate);
            month.week.push(this.getWeekDates(date));

            firstDate += 7;
        }

        return month.week;
    }
}
