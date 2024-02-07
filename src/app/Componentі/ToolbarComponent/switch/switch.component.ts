import { Component } from "@angular/core";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: "app-switch",
    standalone: true,
    imports: [
        MatButtonToggleGroup,
        MatButtonToggle,
        MatIcon,
    ],
    templateUrl: "./switch.component.html",
    styleUrl: "./switch.component.scss"
})
export class SwitchComponent {

}
