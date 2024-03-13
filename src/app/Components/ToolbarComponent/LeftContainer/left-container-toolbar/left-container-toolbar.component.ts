import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatDrawerContainer } from "@angular/material/sidenav";

import { DrawerService } from "../../../../Services/drawer.service";

@Component({
    selector: "app-left-container-toolbar",
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        NgOptimizedImage,
        MatDrawerContainer
    ],
    templateUrl: "./left-container-toolbar.component.html",
    styleUrl: "./left-container-toolbar.component.scss"
})
export class LeftContainerToolbarComponent {
    constructor(private drawerService: DrawerService) {}

    toggleDrawer() {
        this.drawerService.toggleDrawer();
    }
}
