import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LeftContainerToolbarComponent } from "./left-container-toolbar.component";

describe("LeftContainerToolbarComponent", () => {
    let component: LeftContainerToolbarComponent;
    let fixture: ComponentFixture<LeftContainerToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LeftContainerToolbarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LeftContainerToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
