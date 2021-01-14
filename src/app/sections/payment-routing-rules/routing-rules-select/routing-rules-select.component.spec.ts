import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RoutingRulesSelectComponent } from './routing-rules-select.component';

@Component({
    selector: 'cc-host',
    template: `<dsh-routing-rules-select></dsh-routing-rules-select>`,
})
class HostComponent {}

describe('RoutingRulesSelectComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: RoutingRulesSelectComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, RoutingRulesSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(RoutingRulesSelectComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('methods', () => {});

    describe('template', () => {});
});
