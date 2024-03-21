import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class DrawerService {
    private drawerState = new BehaviorSubject<boolean>(false);

    constructor(
        private localStorageService: LocalStorageService
    ) {
        const storedDrawerState = this.localStorageService.getStoredValue("drawerState");

        if (!storedDrawerState) {
            this.localStorageService.setStoredValue("drawerState", JSON.stringify(true));
        }

        const initialDrawerState = storedDrawerState ? JSON.parse(storedDrawerState) : true;

        this.drawerState = new BehaviorSubject<boolean>(initialDrawerState);
    }

    getDrawerState() {
        return this.drawerState.asObservable();
    }

    toggleDrawer() {
        const newState = !this.drawerState.value;

        this.drawerState.next(newState);
        this.localStorageService.setStoredValue("drawerState", JSON.stringify(newState));
    }
}
