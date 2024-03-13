import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

import { CenterContainerToolbarComponent } from "../CenterContainer/center-container-toolbar/center-container-toolbar.component";
import { LeftContainerToolbarComponent } from "../LeftContainer/left-container-toolbar/left-container-toolbar.component";
import { RightContainerToolbarComponent } from "../RightContainer/right-container-toolbar/right-container-toolbar.component";

@Component({
    selector: "app-toolbar",
    standalone: true,
    imports: [
        MatToolbarModule,
        LeftContainerToolbarComponent,
        CenterContainerToolbarComponent,
        RightContainerToolbarComponent
    ],
    templateUrl: "./toolbar.component.html",
    styleUrl: "./toolbar.component.scss"
})
export class ToolbarComponent {

}
