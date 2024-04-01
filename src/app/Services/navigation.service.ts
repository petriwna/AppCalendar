import { Injectable } from "@angular/core";

import { NavigationDirection } from "../utils/navigation-direction";
import { DateService } from "./date.service";
import { FormattingService } from "./formatting.service";

@Injectable({
    providedIn: "root"
})
export class NavigationService {
    constructor(
        private dateService: DateService,
        private formattingService: FormattingService
    ) { }

    navigate(direction: NavigationDirection) {
        this.formattingService.format$.subscribe((format: string): void => {
            switch (direction) {
                case NavigationDirection.TODAY:
                    this.dateService.today();
                    break;
                case NavigationDirection.PREV:
                    this.dateService.prev(format);
                    break;
                case NavigationDirection.NEXT:
                    this.dateService.next(format);
                    break;
                default:
                    console.log("s");
                    break;
            }
        });
    }
}
