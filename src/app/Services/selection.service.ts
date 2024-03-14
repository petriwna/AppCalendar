import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class SelectionService {
    private selectedValueSubject: BehaviorSubject<string>;
    selectedValue$: Observable<string>;

    constructor(private localStorageService: LocalStorageService) {
        this.initializeSelectedValue();
        this.subscribeToSelectionChanges();
    }

    emitSelectionChange(value: string): void {
        this.selectedValueSubject.next(value);
    }

    private initializeSelectedValue(): void {
        const storedValue = this.localStorageService.getStoredValue("selectedValue") || "day";

        this.selectedValueSubject = new BehaviorSubject<string>(storedValue === "schedule" ? "day" : storedValue);
        this.selectedValue$ = this.selectedValueSubject.asObservable();
    }

    private subscribeToSelectionChanges(): void {
        this.selectedValue$.subscribe((value: string) => {
            if (value === "schedule" || this.selectedValueSubject.value === "schedule") {
                this.selectedValueSubject.next("day");
            }
        });
    }
}
