import { AsyncPipe } from "@angular/common";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, OnInit, ViewChild
} from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatCalendar } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { Observable } from "rxjs";

import { DateService } from "../../../Services/date.service";
import { SearchPeopleComponent } from "../search-people/search-people.component";
import { CustomCalendarHeaderComponent } from "./custom-calendar-header/custom-calendar-header.component";

@Component({
    selector: "app-sidenav",
    standalone: true,
    imports: [
        MatCard,
        MatCalendar,
        MatMomentDateModule,
        SearchPeopleComponent,
        AsyncPipe
    ],
    templateUrl: "./sidenav.component.html",
    styleUrl: "./sidenav.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: ["l", "LL"],
                },
                display: {
                    dateInput: "YYYY",
                    monthYearLabel: "MMMM YYYY",
                    dateA11yLabel: "LL",
                    monthYearA11yLabel: "MMMM YYYY",
                },
            },
        },
    ],
})
export class SidenavComponent implements OnInit, AfterViewInit {
    @ViewChild("calendar") calendar: MatCalendar<Date>;
    customCalendarHeader = CustomCalendarHeaderComponent;
    selectedDate: Date;

    currentDate$: Observable<Date>;

    constructor(
        private dateService: DateService
    ) {
        this.currentDate$ = this.dateService.currentDate$;
    }

    ngOnInit(): void {
        this.currentDate$.subscribe((currentDate: Date) => {
            this.selectedDate = currentDate;
        });
    }

    ngAfterViewInit(): void {
        this.calendar.selectedChange.subscribe((value) => {
            this.dateService.setCurrentDate(value);
        });
    }

    changeSelectedDate(newDate: Date): void {
        this.selectedDate = newDate;
        this.dateService.setCurrentDate(new Date(newDate));
    }
}
