import { Injectable } from "@angular/core";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class DateService {
    private months: string[] = [
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
    private daysOfWeek: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    date: Date = new Date();
    currentDate: string;

    constructor(private localStorageService: LocalStorageService) {}

    getTodayDate() {
        return `
        ${this.getDayOfWeekName(this.date.getDay())}, ${this.date.getDate()} ${this.getMonthName(this.date.getMonth())}
        `;
    }

    setCurrentDate(date: Date) {
        this.currentDate = this.getFormatDayMonthYear(date);
        this.saveCurrentDateToLocalStorage();
    }

    getCurrentDate(date: Date) {
        const storedDate = localStorage.getItem("currentDate");
        if (!storedDate) {
            this.setCurrentDate(date);
        }
        this.loadCurrentDateFromLocalStorage();
        return this.currentDate;
    }

    private saveCurrentDateToLocalStorage() {
        localStorage.setItem("currentDate", this.currentDate);
    }

    private loadCurrentDateFromLocalStorage() {
        const storedDate = localStorage.getItem("currentDate");
        if (storedDate) {
            this.currentDate = storedDate;
        }
    }

    getFormatDayMonthYear(date: Date) {
        return `${this.date.getDate()} ${this.getMonthName(date.getMonth())} ${this.getYear(date)}`;
    }

    getFormatMonthYear(date: Date) {
        return `${this.getMonthName(date.getMonth())} ${this.getYear(date)}`;
    }

    getFormatYear(date: Date) {
        return this.getYear(date);
    }

    getMonthName(month: number): string {
        return this.months[month];
    }

    getDayOfWeekName(dayWeek: number): string {
        return this.daysOfWeek[dayWeek];
    }

    getYear(date: Date): number {
        return date.getFullYear();
    }
}
