import { Injectable } from "@angular/core";

import { NavigationDirection } from "../utils/navigation-direction";
import { DateService } from "./date.service";

@Injectable({
    providedIn: "root"
})
export class NavigationService {
    todayDate: Date = new Date();

    constructor(private dateService: DateService) { }

    navigate(direction: NavigationDirection) {
        switch (direction) {
            case NavigationDirection.TODAY:
                this.dateService.setCurrentDate(this.todayDate);
                break;
            case NavigationDirection.PREV:
                this.dateService.prev();
                break;
            case NavigationDirection.NEXT:
                this.dateService.next();
                break;
            default:
                console.log("ddd");
                break;
        }
    }
}
