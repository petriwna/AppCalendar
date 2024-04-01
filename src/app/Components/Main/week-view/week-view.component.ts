import { AsyncPipe, NgForOf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { DateService } from "../../../Services/date.service";
import { FormattingService } from "../../../Services/formatting.service";

@Component({
    selector: "app-week-view",
    standalone: true,
    imports: [
        NgForOf,
        AsyncPipe
    ],
    templateUrl: "./week-view.component.html",
    styleUrl: "./week-view.component.scss"
})
export class WeekViewComponent implements OnInit {
    @Input() selected$: Observable<Date>;
    weekSubject: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);
    week$: Observable<Date[]>;

    constructor(
        private dateService: DateService,
        private formattingService: FormattingService
    ) { }

    ngOnInit() {
        this.selected$.subscribe((selectedDate: Date): void => {
            this.weekSubject.next(this.dateService.getWeekDates(selectedDate));
        });
        this.week$ = this.weekSubject.asObservable();
    }

    getNameDay(date: Date): string {
        return this.formattingService.getDayName(date);
    }

    getDayNumber(date: Date): string {
        return this.formattingService.getDayNumber(date);
    }
}
