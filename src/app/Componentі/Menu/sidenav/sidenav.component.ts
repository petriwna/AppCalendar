import { Component } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatCalendar } from "@angular/material/datepicker";

@Component({
    selector: "app-sidenav",
    standalone: true,
    imports: [
        MatCard,
        MatCalendar
    ],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss"
})
export class SidenavComponent {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    selected: Date | null;
}
