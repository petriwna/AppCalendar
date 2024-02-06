import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { CalendarActionsService } from "../../../Services/calendar-actions.service";

@Component({
    selector: "app-datepicker",
    standalone: true,
    imports: [
        MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatButton
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: "./datepicker.component.html",
    styleUrl: "./datepicker.component.scss"
})
export class DatepickerComponent {
    months: string[] = [
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

    month: string = this.months[new Date(Date.now()).getMonth()];
    year: string = new Date(Date.now()).getFullYear().toString();

    constructor(
        private calendarActionsService: CalendarActionsService
    ) {
    }

    onDateSelected($event: any) {
        const date = new Date($event.value);

        this.month = this.months[date.getMonth()];
        this.year = date.getFullYear().toString();
        this.calendarActionsService.dateSelectionOccured($event.value);
    }
}
