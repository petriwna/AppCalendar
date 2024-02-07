import { Component, OnInit } from "@angular/core";
import { MatDrawerContainer, MatSidenavModule } from "@angular/material/sidenav";

import { DrawerService } from "../../../Services/drawer.service";
import { SidenavComponent } from "../../Menu/sidenav/sidenav.component";

@Component({
    selector: "app-main",
    standalone: true,
    imports: [
        MatDrawerContainer,
        MatSidenavModule,
        SidenavComponent,
    ],
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.scss"
})
export class MainComponent implements OnInit {
    isDrawerOpen: boolean = false;

    constructor(private drawerService: DrawerService) {}

    ngOnInit() {
        this.drawerService.getDrawerState().subscribe((state) => {
            this.isDrawerOpen = state;
        });
    }
}
