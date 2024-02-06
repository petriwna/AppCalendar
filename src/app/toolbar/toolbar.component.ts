import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

import { LeftContainerToolbarComponent } from "../left-container-toolbar/left-container-toolbar.component";

@Component({
    selector: "app-toolbar",
    standalone: true,
    imports: [MatToolbarModule, LeftContainerToolbarComponent],
    templateUrl: "./toolbar.component.html",
    styleUrl: "./toolbar.component.scss"
})
export class ToolbarComponent {

}
