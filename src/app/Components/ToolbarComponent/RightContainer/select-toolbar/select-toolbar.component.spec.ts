import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectToolbarComponent } from "./select-toolbar.component";

describe("SelectToolbarComponent", () => {
    let component: SelectToolbarComponent;
    let fixture: ComponentFixture<SelectToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectToolbarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SelectToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
