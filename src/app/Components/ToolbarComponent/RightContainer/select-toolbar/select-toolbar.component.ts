import {
    Component, EventEmitter, OnInit, Output
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { SelectionService } from "../../../../Services/selection.service";
import { SelectionValue } from "../../../../utils/selected-direction";

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
    selected = new FormControl(SelectionValue.Day);

    @Output() selectionChange = new EventEmitter<SelectionValue>();

    constructor(
        private selectionService: SelectionService
    ) {}

    ngOnInit(): void {
        this.selected.setValue(this.selectionService.getSelectedValue());
    }

    onSelectionChange(event: any): void {
        const value: SelectionValue = event.value as SelectionValue;

        this.selectionService.setSelectedValue(value);
        this.selectionChange.emit(value);
    }
}
