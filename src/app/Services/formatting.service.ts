import { DatePipe } from "@angular/common";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

import { SelectionValue } from "../utils/selected-direction";
import { DateService } from "./date.service";
import { SelectionService } from "./selection.service";

@Injectable({
    providedIn: "root"
})
export class FormattingService implements OnDestroy {
    private formatDateSubject: BehaviorSubject<string>;
    private formatSubject: BehaviorSubject<string>;
    format$: Observable<string>;
    formatDate$: Observable<string>;

    private selectionSubscription: Subscription;

    constructor(
        private selectionService: SelectionService,
        private dateService: DateService,
        private datePipe: DatePipe
    ) {
        this.formatDateSubject = new BehaviorSubject<string>("");
        this.formatDate$ = this.formatDateSubject.asObservable();

        this.subscribeToSelectionChanges();
    }

    private subscribeToSelectionChanges(): void {
        this.selectionSubscription = this.selectionService.selectedValue$.subscribe((value: SelectionValue) => {
            this.updateFormat(value);
        });
    }

    updateFormat(value: SelectionValue): void {
        const formatMap: { [key in SelectionValue]: string } = {
            day: "Day",
            month: "Month",
            week: "Week",
            period: "Month",
            year: "Year",
            schedule: "Day"
        };

        this.formatSubject = new BehaviorSubject<string>(formatMap[value] || "Day");
        this.format$ = this.formatSubject.asObservable();
        this.formatedDate();
    }

    formatedDate(): void {
        this.dateService.currentDate$.subscribe((date: Date): void => {
            switch (this.formatSubject.value) {
                case "Month":
                    this.formatDateSubject.next(this.datePipe.transform(date, "MMMM YYYY") ?? "");
                    break;
                case "Week":
                    this.formatDateSubject.next(this.formatWeek(date));
                    break;
                case "Year":
                    this.formatDateSubject.next(this.datePipe.transform(date, "YYYY") ?? "");
                    break;
                default:
                    this.formatDateSubject.next(this.datePipe.transform(date, "d MMMM YYYY") ?? "");
                    break;
            }
        });
    }

    formatWeek(date: Date): string {
        const week: Date[] = this.dateService.getWeekDates(date);
        const monthStart: number = week[0].getMonth();
        const monthEnd: number = week[week.length - 1].getMonth();

        if (monthStart !== monthEnd) {
            const firsMonth: string = this.datePipe.transform(week[0], "MMM") ?? "";
            const secondMonth: string = this.datePipe.transform(week[week.length - 1], "MMM") ?? "";
            const year: string = this.datePipe.transform(week[1], "YYYY") ?? "";

            return `${firsMonth} – ${secondMonth} ${year}`;
        }

        return this.datePipe.transform(date, "MMMM YYYY") ?? "";
    }

    formatTodayDateToDayWeekDayMonth(): string {
        return this.datePipe.transform(new Date(), "EEEE, d MMMM") ?? "";
    }

    public getDayName(date: Date): string {
        return this.datePipe.transform(date, "E") || "";
    }

    public getDayNumber(date: Date): string {
        return this.datePipe.transform(date, "d") || "";
    }

    ngOnDestroy(): void {
        this.selectionSubscription.unsubscribe();
    }
}
