import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { By, DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseComponent } from './collapse.component';
import { CollapseModule } from './collapse.module';

@Component({ template: '<dsh-collapse title="Title">Test</dsh-collapse>' })
class MockCollapseComponent {}

@Component({
    template: '<dsh-collapse title="Title Up" expanded="true">Test Expanded</dsh-collapse>',
})
class MockCollapseExpandedComponent {}

describe('CollapseComponent', () => {
    class Selector {
        constructor(private _fixture: ComponentFixture<MockCollapseComponent>) {}

        selectCollapse = () => this._fixture.debugElement.query(By.directive(CollapseComponent));
        selectCollapseInstance = (): CollapseComponent => this.selectCollapse().componentInstance;
        selectHeader = () => this.selectCollapse().query(By.css('.dsh-collapse-header'));
        selectIndicator = () => this.selectCollapse().query(By.directive(MatIcon));
        selectBody = () => this.selectCollapse().query(By.css('.dsh-collapse-body'));
        selectWrapper = () => this.selectCollapse().query(By.css('.dsh-collapse'));
        selectChildren = () =>
            Array.from((this.selectWrapper().nativeElement as HTMLElement).children);
    }

    let fixture: ComponentFixture<MockCollapseComponent>;
    let selector: Selector;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CollapseModule, NoopAnimationsModule, HttpClientTestingModule],
            declarations: [MockCollapseComponent, MockCollapseExpandedComponent],
        }).compileComponents();
    });

    beforeEach(inject(
        [MatIconRegistry, DomSanitizer],
        (mir: MatIconRegistry, sanitizer: DomSanitizer) => {
            const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl('./test.svg');
            mir.addSvgIcon('keyboard_arrow_up', sanitizedUrl);
        }
    ));

    it('should create', () => {
        fixture = TestBed.createComponent(CollapseComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    describe('collapse down', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(MockCollapseComponent);
            selector = new Selector(fixture);
            fixture.detectChanges();
        });

        describe('template', () => {
            it('should render title', () => {
                const header = selector.selectHeader();
                expect(header.nativeElement.textContent).toBe('Title');
            });

            it('should render indicator', () => {
                const icon = selector.selectIndicator();
                expect(icon).toBeTruthy();
            });

            it("shouldn't render content", () => {
                const body = selector.selectBody();
                expect(body).toBeNull();
            });

            it('should init collapsed', () => {
                const collapseComponent = selector.selectCollapseInstance();
                expect(collapseComponent.expanded).toBeFalsy();
            });

            it('should expand on click', () => {
                const collapseComponent = selector.selectCollapseInstance();
                const header = selector.selectHeader();
                header.nativeElement.click();
                fixture.detectChanges();
                const body = selector.selectBody();
                expect(collapseComponent.expanded).toBeTruthy();
                expect(body).toBeTruthy();
            });

            it('should collapse after second click', () => {
                const collapseComponent = selector.selectCollapseInstance();
                const header = selector.selectHeader();
                header.nativeElement.click();
                header.nativeElement.click();
                expect(collapseComponent.expanded).toBeFalsy();
            });

            it('should expand on click down', () => {
                selector.selectHeader().nativeElement.click();
                fixture.detectChanges();
                const body = selector.selectBody();
                const children = selector.selectChildren();
                expect(children[1]).toEqual(body.nativeElement);
            });
        });
    });

    describe('collapse up', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(MockCollapseExpandedComponent);
            selector = new Selector(fixture);
            fixture.detectChanges();
        });

        describe('template', () => {
            it('should expanded', () => {
                selector.selectHeader().nativeElement.click();
                fixture.detectChanges();
                const body = selector.selectBody();
                const children = selector.selectChildren();
                expect(children[0]).toEqual(body.nativeElement);
            });
        });
    });
});
