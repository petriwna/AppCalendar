import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

import { CenterContainerToolbarComponent } from "../center-container-toolbar/center-container-toolbar.component";
import { LeftContainerToolbarComponent } from "../left-container-toolbar/left-container-toolbar.component";

@Component({
    selector: "app-toolbar",
    standalone: true,
    imports: [MatToolbarModule, LeftContainerToolbarComponent, CenterContainerToolbarComponent],
    templateUrl: "./toolbar.component.html",
    styleUrl: "./toolbar.component.scss"
})
export class ToolbarComponent {

}
