import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { MainComponent } from "./Main/main/main.component";
import { ToolbarComponent } from "./ToolbarComponent/toolbar/toolbar.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, ToolbarComponent, MainComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    title = "AppCalendar";
}
