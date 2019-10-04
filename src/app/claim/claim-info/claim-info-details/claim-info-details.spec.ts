import { async, TestBed } from '@angular/core/testing';
import { ClaimInfoDetailsComponent } from './claim-info-details.component';
import { By } from '@angular/platform-browser';

describe('ClaimInfoDetailsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClaimInfoDetailsComponent]
        })
            .compileComponents()
            .then(() => {
                const fixture = TestBed.createComponent(ClaimInfoDetailsComponent);
                const rendered = fixture.debugElement.componentInstance;
            });
    }));
    it('should create component', async(() => {
        const fixture = TestBed.createComponent(ClaimInfoDetailsComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));
    it('should render reason', async(() => {
        const fixture = TestBed.createComponent(ClaimInfoDetailsComponent);
        const rendered = fixture.debugElement.componentInstance;
        expect(rendered).toBeTruthy();
    }));
});
