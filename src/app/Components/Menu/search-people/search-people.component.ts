import { AsyncPipe, NgForOf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
    selector: "app-search-people",
    standalone: true,
    imports: [
        FormsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
        NgForOf,
        MatInputModule,
        MatIcon,
    ],
    templateUrl: "./search-people.component.html",
    styleUrl: "./search-people.component.scss"
})
export class SearchPeopleComponent implements OnInit {
    control = new FormControl("");
    streets: string[] = ["Champs-Élysées", "Lombard Street", "Abbey Road", "Fifth Avenue"];
    filteredStreets: Observable<string[]>;

    ngOnInit() {
        this.filteredStreets = this.control.valueChanges.pipe(
            startWith(""),
            map((value) => this._filter(value || "")),
        );
    }

    private _filter(value: string): string[] {
        const filterValue = this._normalizeValue(value);
        return this.streets.filter((street) => this._normalizeValue(street).includes(filterValue));
    }

    // eslint-disable-next-line class-methods-use-this
    private _normalizeValue(value: string): string {
        return value.toLowerCase().replace(/\s/g, "");
    }
}
