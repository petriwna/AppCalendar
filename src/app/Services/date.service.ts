import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import {
    BehaviorSubject, Observable
} from "rxjs";

import { SelectionValue } from "../utils/selected-direction";
import { LocalStorageService } from "./local-storage.service";
import { SelectionService } from "./selection.service";

@Injectable({
    providedIn: "root"
})
export class DateService {
    private currentValueSubject: BehaviorSubject<Date>;
    private formatDateWSubject: BehaviorSubject<string>;

    currentDate$: Observable<Date>;
    format: string;
    formatDateW$: Observable<string>;

    constructor(
        private localStorageService: LocalStorageService,
        private selectionService: SelectionService,
        private datePipe: DatePipe
    ) {
        this.currentValueSubject = new BehaviorSubject<Date>(new Date());
        this.currentDate$ = this.currentValueSubject.asObservable();
        this.formatDateWSubject = new BehaviorSubject<string>("");
        this.formatDateW$ = this.formatDateWSubject.asObservable();

        this.initializeCurrentValue();
        this.subscribeToSelectionChanges();
    }

    private initializeCurrentValue(): void {
        const storedValueDate = this.localStorageService.getStoredValue("currentDate");
        const initialDate = storedValueDate ? new Date(storedValueDate) : new Date();

        this.setCurrentDate(initialDate);
    }

    private subscribeToSelectionChanges(): void {
        this.selectionService.selectedValue$.subscribe((value: SelectionValue) => {
            this.updateFormat(value);
        });
    }

    updateFormat(value: SelectionValue): void {
        const formatMap: { [key in SelectionValue]: string } = {
            day: "Day",
            month: "Month",
            week: "Month",
            period: "Month",
            year: "Year",
            schedule: "Day"
        };

        this.format = formatMap[value] || "Day";
        this.formatDate();
    }

    formatDate(): void {
        this.currentDate$.subscribe((c) => {
            switch (this.format) {
                case "Month":
                    this.formatDateWSubject.next(this.datePipe.transform(c, "MMMM YYYY") ?? "");
                    break;
                case "Year":
                    this.formatDateWSubject.next(this.datePipe.transform(c, "YYYY") ?? "");
                    break;
                default:
                    this.formatDateWSubject.next(this.datePipe.transform(c, "d MMMM YYYY") ?? "");
                    break;
            }
        });
    }

    setCurrentDate(date: Date): void {
        this.localStorageService.setStoredValue("currentDate", date.toISOString());
        this.currentValueSubject.next(date);
        this.formatDate();
    }

    formatTodayDateToDayWeekDayMonth(): string {
        return this.datePipe.transform(new Date(), "EEEE, d MMMM") ?? "";
    }

    next(): void {
        const currentDate = this.currentValueSubject.value;

        switch (this.format) {
            case "Month":
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case "Year":
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
            default:
                currentDate.setDate(currentDate.getDate() + 1);
        }
        this.setCurrentDate(currentDate);
    }

    prev(): void {
        const currentDate = this.currentValueSubject.value;

        switch (this.format) {
            case "Month":
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
            case "Year":
                currentDate.setFullYear(currentDate.getFullYear() - 1);
                break;
            default:
                currentDate.setDate(currentDate.getDate() - 1);
        }
        this.setCurrentDate(currentDate);
    }
}
