import { Component, OnInit } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { DateService } from "../../../../Services/date.service";
import { LocalStorageService } from "../../../../Services/local-storage.service";
import { SelectionService } from "../../../../Services/selection.service";
import { SelectToolbarComponent } from "../../RightContainer/select-toolbar/select-toolbar.component";
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: "app-center-container-toolbar",
    standalone: true,
    imports: [
        MatButton,
        MatIcon,
        MatIconButton,
        NavigationComponent
    ],
    providers: [
        SelectToolbarComponent
    ],
    templateUrl: "./center-container-toolbar.component.html",
    styleUrl: "./center-container-toolbar.component.css"
})
export class CenterContainerToolbarComponent implements OnInit {
    today: string;
    currentDate: string;
    selectedValue: string;

    constructor(
        private dateService: DateService,
        private localStorageService: LocalStorageService,
        private selectionService: SelectionService
    ) {}

    ngOnInit(): void {
        this.today = this.dateService.formatTodayDateToDayWeekDayMonth();
        this.selectedValue = this.localStorageService.getStoredValue("selectedValue");
        this.subscribeToSelectionChanges();
        this.subscribeToCurrentDateChanges();
    }

    handleTodayButton(): void {
        switch (this.selectedValue) {
            case "month":
            case "week":
            case "period":
                this.currentDate = this.dateService.setCurrentMonthToday();
                break;
            case "year":
                this.currentDate = this.dateService.setCurrentYearToday();
                break;
            default:
                this.currentDate = this.dateService.setCurrentDateToday();
                break;
        }
    }

    private subscribeToSelectionChanges(): void {
        this.selectionService.selectedValue$.subscribe((value: string) => {
            this.selectedValue = value;
            this.currentDate = this.dateService.updateFormatCurrentDate(value, this.currentDate);
        });
    }

    private subscribeToCurrentDateChanges(): void {
        this.dateService.currentDate$.subscribe((value: string) => {
            this.currentDate = this.dateService.getFormat(this.selectedValue, value);
        });
    }
}
