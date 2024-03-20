import { Component, OnInit } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Subscription } from "rxjs";

import { DateService } from "../../../../Services/date.service";
import { LocalStorageService } from "../../../../Services/local-storage.service";
import { NavigationService } from "../../../../Services/navigation.service";
import { SelectionService } from "../../../../Services/selection.service";
import { NavigationDirection } from "../../../../utils/navigation-direction";
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
    templateUrl: "./center-container-toolbar.component.html",
    styleUrl: "./center-container-toolbar.component.css"
})
export class CenterContainerToolbarComponent implements OnInit {
    private formatDateSubscription: Subscription;

    today: string;
    currentDate: string;
    navigationDirection = NavigationDirection;

    constructor(
        private dateService: DateService,
        private localStorageService: LocalStorageService,
        private selectionService: SelectionService,
        private navigationService: NavigationService
    ) {
    }

    ngOnInit(): void {
        this.today = this.dateService.formatTodayDateToDayWeekDayMonth();

        this.formatDateSubscription = this.dateService.formatDateW$.subscribe((formatDateW: string) => {
            this.currentDate = formatDateW;
        });
    }

    handleNavigation(direction: NavigationDirection) {
        this.navigationService.navigate(direction);
    }
}
