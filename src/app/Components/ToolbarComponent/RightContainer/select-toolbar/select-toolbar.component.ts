import {
    Component, EventEmitter, OnInit, Output
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { LocalStorageService } from "../../../../Services/local-storage.service";
import { SelectionService } from "../../../../Services/selection.service";

@Component({
    selector: "app-select-toolbar",
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButton
    ],
    templateUrl: "./select-toolbar.component.html",
    styleUrl: "./select-toolbar.component.scss"
})
export class SelectToolbarComponent implements OnInit {
    selected = new FormControl("month");

    @Output() selectionChange = new EventEmitter<string>();

    constructor(
        private localStorageService: LocalStorageService,
        private selectionService: SelectionService
    ) {}

    ngOnInit(): void {
        this.initializeSelectedValue();
        this.subscribeToSelectionChanges();
    }

    private initializeSelectedValue(): void {
        let storedValue = this.localStorageService.getStoredValue("selectedValue");
        if (!storedValue) {
            storedValue = "month";
            this.localStorageService.setStoredValue("selectedValue", storedValue);
        }
        this.selected.setValue(storedValue);
    }

    private subscribeToSelectionChanges(): void {
        this.selected.valueChanges.subscribe((value) => {
            if (typeof value === "string") {
                this.localStorageService.setStoredValue("selectedValue", value);
                this.selectionService.emitSelectionChange(value);
            }
        });
    }

    onSelectionChange(event: any): void {
        this.selectionService.emitSelectionChange(event.value);
    }
}
