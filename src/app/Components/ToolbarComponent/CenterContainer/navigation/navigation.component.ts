import { Component, OnInit } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { DateService } from "../../../../Services/date.service";
import { LocalStorageService } from "../../../../Services/local-storage.service";
import { SelectionService } from "../../../../Services/selection.service";
import { SelectionValue } from "../../../../utils/selected-direction";

@Component({
    selector: "app-navigation",
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton
    ],
    templateUrl: "./navigation.component.html",
    styleUrl: "./navigation.component.css"
})
export class NavigationComponent implements OnInit {
    selectedValue: SelectionValue;
    currentDate: string;

    constructor(
        private dateService: DateService,
        private localStorageService: LocalStorageService,
        private selectionService: SelectionService
    ) {
    }

    ngOnInit(): void {
        this.dateService.currentDate$.subscribe((value: string) => {
            this.currentDate = value;
        });
        this.selectionService.selectedValue$.subscribe((value: SelectionValue) => {
            this.selectedValue = value;
        });
    }

    handleNextButton(): void {
        let value: string;

        switch (this.selectedValue) {
            case SelectionValue.Month:
            case SelectionValue.Week:
            case SelectionValue.Period:
                value = this.dateService.nextMonth(this.currentDate);
                this.currentDate = value;
                break;
            case SelectionValue.Year:
                value = this.dateService.nextYear(this.currentDate);
                this.currentDate = value;
                break;
            default:
                value = this.dateService.nextDay(this.currentDate);
                this.currentDate = value;
                break;
        }
    }

    handlePrevButton(): void {
        let value: string;

        switch (this.selectedValue) {
            case SelectionValue.Month:
            case SelectionValue.Week:
            case SelectionValue.Period:
                value = this.dateService.prevMonth(this.currentDate);
                this.currentDate = value;
                break;
            case SelectionValue.Year:
                value = this.dateService.prevYear(this.currentDate);
                this.currentDate = value;
                break;
            default:
                value = this.dateService.prevDay(this.currentDate);
                this.currentDate = value;
                break;
        }
    }
}
