import { Component, OnInit } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { NavigationService } from "../../../../Services/navigation.service";
import { SelectionService } from "../../../../Services/selection.service";
import { NavigationDirection } from "../../../../utils/navigation-direction";
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
    navigationDirection = NavigationDirection;

    constructor(
        private selectionService: SelectionService,
        private navigationService: NavigationService
    ) {
    }

    ngOnInit(): void {
        this.selectionService.selectedValue$.subscribe((value: SelectionValue) => {
            this.selectedValue = value;
        });
    }

    handleNavigation(direction: NavigationDirection): void {
        this.navigationService.navigate(direction);
    }
}
