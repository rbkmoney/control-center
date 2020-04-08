import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-form-wrapper',
    templateUrl: 'form-wrapper.component.html',
})
export class FormWrapperComponent {
    @Input()
    name: string;
}
