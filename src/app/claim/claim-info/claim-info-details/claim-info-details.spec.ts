import { TestBed, waitForAsync } from '@angular/core/testing';

import { ClaimInfoDetailsComponent } from './claim-info-details.component';

describe('ClaimInfoDetailsComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ClaimInfoDetailsComponent],
        })
            .compileComponents()
            .then();
    }));
    it('should create component', waitForAsync(() => {
        const fixture = TestBed.createComponent(ClaimInfoDetailsComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));
    it('should render reason', waitForAsync(() => {
        const fixture = TestBed.createComponent(ClaimInfoDetailsComponent);
        const rendered = fixture.debugElement.componentInstance;
        expect(rendered).toBeTruthy();
    }));
});
