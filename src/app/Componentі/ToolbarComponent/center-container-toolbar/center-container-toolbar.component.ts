import { Component } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { DatepickerComponent } from "../datepicker/datepicker.component";

@Component({
    selector: "app-center-container-toolbar",
    standalone: true,
    imports: [
        MatButton,
        MatIcon,
        MatIconButton,
        DatepickerComponent
    ],
    templateUrl: "./center-container-toolbar.component.html",
    styleUrl: "./center-container-toolbar.component.css"
})
export class CenterContainerToolbarComponent {
    date: Date = new Date(Date.now());
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
    daysOfWeek: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    month: string = this.months[this.date.getMonth()];
    dayWeek: string = this.daysOfWeek[this.date.getDay()];
    dateMonth: number = this.date.getDate();
    today: string = `${this.dayWeek}, ${this.dateMonth} ${this.month}`;
}
