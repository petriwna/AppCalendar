import { NgForOf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { DateService } from "../../../Services/date.service";
import { FormattingService } from "../../../Services/formatting.service";

@Component({
    selector: "app-month-view",
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: "./month-view.component.html",
    styleUrl: "./month-view.component.scss"
})
export class MonthViewComponent implements OnInit {
    @Input() selected$: Observable<Date>;
    weeks: Date[][];

    constructor(
        private dateService: DateService,
        private formattingService: FormattingService
    ) {
    }

    ngOnInit(): void {
        this.selected$.subscribe((selectedDate: Date): void => {
            this.weeks = this.dateService.getWeeksInMonth(selectedDate);
        });
    }

    getDayNumber(date: Date): string {
        return this.formattingService.getDayNumber(date);
    }
}
