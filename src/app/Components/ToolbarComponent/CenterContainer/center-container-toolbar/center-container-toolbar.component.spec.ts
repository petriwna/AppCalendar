import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CenterContainerToolbarComponent } from "./center-container-toolbar.component";

describe("CenterContainerToolbarComponent", () => {
    let component: CenterContainerToolbarComponent;
    let fixture: ComponentFixture<CenterContainerToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CenterContainerToolbarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CenterContainerToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
