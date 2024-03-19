import { Component, OnInit } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { DateService } from "../../../../Services/date.service";
import { LocalStorageService } from "../../../../Services/local-storage.service";
import { SelectionService } from "../../../../Services/selection.service";
import { SelectionValue } from "../../../../utils/selected-direction";
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
    selectedValue: SelectionValue;

    constructor(
        private dateService: DateService,
        private localStorageService: LocalStorageService,
        private selectionService: SelectionService,
    ) {}

    ngOnInit(): void {
        this.today = this.dateService.formatTodayDateToDayWeekDayMonth();
        this.selectedValue = this.selectionService.getSelectedValue();
        this.selectionService.selectedValue$.subscribe((value: SelectionValue) => {
            this.selectedValue = value;
        });
    }

    handleTodayButton(): void {
        switch (this.selectedValue) {
            case SelectionValue.Month:
            case SelectionValue.Week:
            case SelectionValue.Period:
                this.currentDate = this.dateService.setCurrentMonthToday();
                break;
            case SelectionValue.Year:
                this.currentDate = this.dateService.setCurrentYearToday();
                break;
            default:
                this.currentDate = this.dateService.setCurrentDateToday();
                break;
        }
    }
}
