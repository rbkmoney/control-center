import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChangeDelegateRulesetDialogComponent } from './change-delegate-ruleset-dialog.component';

@Component({
    selector: 'cc-host',
    template: `<dsh-change-delegate-ruleset-dialog></dsh-change-delegate-ruleset-dialog>`,
})
class HostComponent {}

describe('ChangeDelegateRulesetDialogComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: ChangeDelegateRulesetDialogComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, ChangeDelegateRulesetDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(
            By.directive(ChangeDelegateRulesetDialogComponent)
        );
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
