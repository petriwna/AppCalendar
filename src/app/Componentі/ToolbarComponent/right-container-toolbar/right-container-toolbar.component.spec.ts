import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RightContainerToolbarComponent } from "./right-container-toolbar.component";

describe("RightContainerToolbarComponent", () => {
    let component: RightContainerToolbarComponent;
    let fixture: ComponentFixture<RightContainerToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RightContainerToolbarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RightContainerToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
