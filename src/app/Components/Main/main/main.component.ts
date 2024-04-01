import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
    MatCalendar,
    MatCalendarHeader
} from "@angular/material/datepicker";
import { MatIcon } from "@angular/material/icon";
import { MatDrawerContainer, MatSidenavModule } from "@angular/material/sidenav";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DateService } from "../../../Services/date.service";
import { DrawerService } from "../../../Services/drawer.service";
import { SelectionService } from "../../../Services/selection.service";
import { SelectionValue } from "../../../utils/selected-direction";
import { SidenavComponent } from "../../Menu/sidenav/sidenav.component";
import { DayViewComponent } from "../day-view/day-view.component";
import { MonthViewComponent } from "../month-view/month-view.component";
import { PeriodViewComponent } from "../period-view/period-view.component";
import { ScheduleViewComponent } from "../schedule-view/schedule-view.component";
import { WeekViewComponent } from "../week-view/week-view.component";
import { YearViewComponent } from "../year-view/year-view.component";

@Component({
    selector: "app-main",
    standalone: true,
    imports: [
        MatDrawerContainer,
        MatSidenavModule,
        SidenavComponent,
        MatCalendar,
        MatIcon,
        MatCalendarHeader,
        DayViewComponent,
        NgIf,
        WeekViewComponent,
        MonthViewComponent,
        YearViewComponent,
        ScheduleViewComponent,
        PeriodViewComponent,
    ],
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.scss"
})
export class MainComponent implements OnInit {
    protected readonly SelectionValue = SelectionValue;
    private viewSubject: BehaviorSubject<SelectionValue>;
    viewW$: Observable<SelectionValue>;
    view: SelectionValue = this.selectionService.getSelectedValue();

    isDrawerOpen: boolean = false;

    selectedDateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    selected$: Observable<Date>;

    @Input()
    set selectedDate(selectedDate: Date) {
        this.selectedDateSubject.next(selectedDate);
    }
    get selectedDate(): Date {
        return this.selectedDateSubject.getValue();
    }

    constructor(
        private drawerService: DrawerService,
        private selectionService: SelectionService,
        private dateService: DateService
    ) {
        this.viewSubject = new BehaviorSubject<SelectionValue>(this.selectionService.getSelectedValue());
        this.viewW$ = this.viewSubject.asObservable();
        this.selected$ = this.selectedDateSubject.pipe(map((date: Date) => date));
    }

    ngOnInit() {
        this.drawerService.getDrawerState().subscribe((state) => {
            this.isDrawerOpen = state;
        });

        this.dateService.currentDate$.subscribe((s) => {
            this.selectedDate = s;
        });

        this.selectionService.selectedValue$.subscribe((s: SelectionValue) => {
            this.viewSubject.next(s);
        });
    }

    getSelectedView(view: SelectionValue): boolean {
        return this.viewSubject.getValue() === view;
    }
}
