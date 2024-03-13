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

    constructor(
        private dateService: DateService,
        private localStorageService: LocalStorageService,
        private selectionService: SelectionService
    ) { }

    ngOnInit(): void {
        this.initializeSelectedValue();
        this.subscribeToSelectionChanges();
    }

    private initializeSelectedValue(): void {
        this.selectedValue = this.localStorageService.getStoredValue("selectedValue") || "day";
        if (this.selectedValue === "schedule") {
            this.selectedValue = "day";
        }
    }

    private subscribeToSelectionChanges(): void {
        this.selectionService.selectionChange.subscribe((value: string) => {
            if (value === "schedule" || this.selectedValue === "schedule") {
                this.selectedValue = "day";
            } else {
                this.selectedValue = value;
            }
        });
    }

    handleNextButton() {

    }

    handlePrevButton() {

    }

    prevMonth(): void {
    // this.date.setMonth(this.date.getMonth() - 1);
    // this.updateDate();
    }

    nextMonth(): void {
    // this.date.setMonth(this.date.getMonth() + 1);
    // this.updateDate();
    }

    prevDay(): void {
    // this.date.setDate(this.date.getDate() - 1);
    // this.updateDate();
    }

    nextDay(): void {
    // this.date.setDate(this.date.getDate() + 1);
    // this.updateDate();
    }
}
