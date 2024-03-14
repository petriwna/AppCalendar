import { Component, OnInit } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { DateService } from "../../../../Services/date.service";
import { LocalStorageService } from "../../../../Services/local-storage.service";
import { SelectionService } from "../../../../Services/selection.service";

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
    selectedValue: string;
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
        this.selectionService.selectedValue$.subscribe((value: string) => {
            this.selectedValue = value;
        });
    }

    handleNextButton(): void {
        let value: string;

        switch (this.selectedValue) {
            case "month":
            case "week":
            case "period":
                this.currentDate = this.dateService.setCurrentMonthToday();
                break;
            case "year":
                value = this.dateService.nextYear(this.currentDate);
                this.currentDate = value;
                break;
            default:
                break;
        }
    }

    handlePrevButton(): void {
        let value: string;

        switch (this.selectedValue) {
            case "month":
            case "week":
            case "period":
                this.currentDate = this.dateService.setCurrentMonthToday();
                break;
            case "year":
                value = this.dateService.prevYear(this.currentDate);
                this.currentDate = value;
                break;
            default:
                this.currentDate = this.dateService.setCurrentDateToday();
                break;
        }
    }
}
