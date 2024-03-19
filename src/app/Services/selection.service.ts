import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { SelectionValue } from "../utils/selected-direction";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class SelectionService {
    private selectedValueSubject: BehaviorSubject<SelectionValue>;
    selectedValue$: Observable<SelectionValue>;

    constructor(private localStorageService: LocalStorageService) {
        this.initializeSelectedValue();
    }

    private initializeSelectedValue(): void {
        let storedValue = this.localStorageService.getStoredValue("selectedValue") as SelectionValue;

        if (!storedValue) {
            storedValue = SelectionValue.Day;
            this.localStorageService.setStoredValue("selectedValue", storedValue);
        }
        this.selectedValueSubject = new BehaviorSubject<SelectionValue>(storedValue);
        this.selectedValue$ = this.selectedValueSubject.asObservable();
    }

    getSelectedValue(): SelectionValue {
        return this.selectedValueSubject.getValue();
    }

    setSelectedValue(value: SelectionValue): void {
        this.selectedValueSubject.next(value);
        this.localStorageService.setStoredValue("selectedValue", value);
    }
}
