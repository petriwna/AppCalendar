import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatCalendarHeader } from "@angular/material/datepicker";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: "app-custom-calendar-header",
    standalone: true,
    imports: [
        MatIcon,
        MatButton
    ],
    templateUrl: "./custom-calendar-header.component.html",
    styleUrl: "./custom-calendar-header.component.css"
})
export class CustomCalendarHeaderComponent extends MatCalendarHeader<Date> {
    get label() {
        return super.periodButtonText;
    }

    next() {
        super.nextClicked();
    }

    prev() {
        super.previousClicked();
    }
}
