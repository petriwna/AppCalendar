import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: "app-left-container-toolbar",
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        NgOptimizedImage
    ],
    templateUrl: "./left-container-toolbar.component.html",
    styleUrl: "./left-container-toolbar.component.scss"
})
export class LeftContainerToolbarComponent {

}
