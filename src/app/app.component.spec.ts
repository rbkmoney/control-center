import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';

xdescribe('AppComponent', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [AppComponent],
                imports: [MatIconModule, MatMenuModule],
            }).compileComponents();
        })
    );
    it(
        'should create the app',
        waitForAsync(() => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        })
    );
    it(
        `should have as title 'control-center'`,
        waitForAsync(() => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app.title).toEqual('control-center');
        })
    );
    it(
        'should render title in a h1 tag',
        waitForAsync(() => {
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain(
                'Welcome to control-center!'
            );
        })
    );
});
