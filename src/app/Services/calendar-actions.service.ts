import { Injectable } from "@angular/core";
import { Moment } from "moment";
import { Subject } from "rxjs";

import { NavigationDirection } from "../util/navigation-direction";

@Injectable({
    providedIn: "root"
})
export class CalendarActionsService {
    dayNavigationActionSource = new Subject<NavigationDirection>();
    dayNavigationAction$ = this.dayNavigationActionSource.asObservable();

    dateSetActionSource = new Subject<Moment>();
    dateSetAction$ = this.dateSetActionSource.asObservable();

    // When a date is set.
    dateSelectionOccured(selectedDate: Moment) {
        this.dateSetActionSource.next(selectedDate);
    }

    // When navigation has occurred.
    dayNavigationOccured(direction: NavigationDirection) {
        this.dayNavigationActionSource.next(direction);
    }
}
