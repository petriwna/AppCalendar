import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class SelectionService {
    selectionChange: EventEmitter<string> = new EventEmitter<string>();

    emitSelectionChange(value: string): void {
        this.selectionChange.emit(value);
    }
}
