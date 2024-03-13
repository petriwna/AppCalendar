import { Component, OnInit } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { DateService } from "../../../../Services/date.service";
import { LocalStorageService } from "../../../../Services/local-storage.service";
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
    date: Date;
    currentDate: string;

    constructor(
        private dateService: DateService,
        private localStorageService: LocalStorageService
    ) {
        this.today = this.dateService.getTodayDate();
        this.date = new Date();
        this.currentDate = this.dateService.getCurrentDate(this.date);
    }

    ngOnInit() {
        this.localStorageService.setDefaultIfNotExists("currentDate", this.currentDate);
    }

    updateCurrentDate(): void {
        this.dateService.setCurrentDate(this.date);
    }
}
