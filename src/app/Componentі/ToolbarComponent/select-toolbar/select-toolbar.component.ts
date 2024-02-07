import { Component } from "@angular/core";
import {
    FormControl, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

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
export class SelectToolbarComponent {
    selected = new FormControl("month", [Validators.required, Validators.pattern("month")]);

    selectFormControl = new FormControl("month", [Validators.required, Validators.pattern("month")]);

    nativeSelectFormControl = new FormControl("month", [
        Validators.required,
        Validators.pattern("month"),
    ]);
}
