import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { SelectToolbarComponent } from "../select-toolbar/select-toolbar.component";
import { SwitchComponent } from "../switch/switch.component";

@Component({
    selector: "app-right-container-toolbar",
    standalone: true,
    imports: [
        MatIconButton,
        MatIcon,
        SelectToolbarComponent,
        SwitchComponent
    ],
    templateUrl: "./right-container-toolbar.component.html",
    styleUrl: "./right-container-toolbar.component.scss"
})
export class RightContainerToolbarComponent {

}
