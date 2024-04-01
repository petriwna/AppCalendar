import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import { FormattingService } from "../../../Services/formatting.service";

@Component({
    selector: "app-day-view",
    standalone: true,
    imports: [],
    templateUrl: "./day-view.component.html",
    styleUrl: "./day-view.component.scss"
})
export class DayViewComponent {
    @Input() selected$: Observable<Date>;

    constructor(
        private formattingService: FormattingService,
    ) {
    }

    getNameDay(): string {
        let dayName: string = "";

        this.selected$.subscribe((selectedDate: Date): void => {
            dayName = this.formattingService.getDayName(selectedDate);
        });

        return dayName;
    }

    getDayNumber(): string {
        let dayNumber: string = "";

        this.selected$.subscribe((selectedDate: Date): void => {
            dayNumber = this.formattingService.getDayNumber(selectedDate);
        });

        return dayNumber;
    }
}
