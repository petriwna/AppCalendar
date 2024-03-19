import { Injectable } from "@angular/core";

import { NavigationDirection } from "../utils/navigation-direction";

@Injectable({
    providedIn: "root"
})
export class NavigationService {
    navigate: NavigationDirection;
}
