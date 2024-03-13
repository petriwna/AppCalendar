import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {
    getStoredValue(key: string): string {
        return localStorage.getItem(key)!;
    }

    setStoredValue(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    setDefaultIfNotExists(key: string, defaultValue: string): void {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue);
        }
    }
}
