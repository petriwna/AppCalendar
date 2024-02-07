import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DrawerService {
    private drawerState = new BehaviorSubject<boolean>(false);

    getDrawerState() {
        return this.drawerState.asObservable();
    }

    toggleDrawer() {
        this.drawerState.next(!this.drawerState.value);
    }
}
