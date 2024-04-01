import { Component, OnInit } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Subscription } from "rxjs";

import { FormattingService } from "../../../../Services/formatting.service";
import { NavigationService } from "../../../../Services/navigation.service";
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
    styleUrl: "./center-container-toolbar.component.scss"
})
export class CenterContainerToolbarComponent implements OnInit {
    private formatDateSubscription: Subscription;

    today: string;
    currentDate: string;
    navigationDirection = NavigationDirection;

    constructor(
        private formattingService: FormattingService,
        private navigationService: NavigationService
    ) {}

    ngOnInit(): void {
        this.today = this.formattingService.formatTodayDateToDayWeekDayMonth();

        this.formatDateSubscription = this.formattingService.formatDate$.subscribe((formatDate: string) => {
            this.currentDate = formatDate;
        });
    }

    handleNavigation(direction: NavigationDirection) {
        this.navigationService.navigate(direction);
    }
}
