import { Component } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { DatepickerComponent } from "../datepicker/datepicker.component";

@Component({
    selector: "app-center-container-toolbar",
    standalone: true,
    imports: [
        MatButton,
        MatIcon,
        MatIconButton,
        DatepickerComponent
    ],
    templateUrl: "./center-container-toolbar.component.html",
    styleUrl: "./center-container-toolbar.component.css"
})
export class CenterContainerToolbarComponent {

}
