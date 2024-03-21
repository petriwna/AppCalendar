import {
    Component, OnInit, ViewChild
} from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatCalendar } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import moment from "moment";

import { DateService } from "../../../Services/date.service";
import { SearchPeopleComponent } from "../search-people/search-people.component";

@Component({
    selector: "app-sidenav",
    standalone: true,
    imports: [
        MatCard,
        MatCalendar,
        MatMomentDateModule,
        SearchPeopleComponent
    ],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss"
})
export class SidenavComponent implements OnInit {
    @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

    activeDate: MatMomentDateModule;

    constructor(
        private dateService: DateService
    ) {}

    ngOnInit(): void {
        this.dateService.currentDate$.subscribe((currentDate: Date) => {
            this.activeDate = moment(currentDate);
        });
    }

    changeSelectedDate(newDate: Date): void {
        this.activeDate = newDate;
        this.dateService.setCurrentDate(new Date(newDate));
    }
}
