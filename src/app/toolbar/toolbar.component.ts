import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: "app-toolbar",
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, NgOptimizedImage],
    templateUrl: "./toolbar.component.html",
    styleUrl: "./toolbar.component.scss"
})
export class ToolbarComponent {

}
