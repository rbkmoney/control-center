import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-nested-form-wrapper',
    templateUrl: 'nested-form-wrapper.component.html',
})
export class NestedFormWrapperComponent {
    @Input()
    caption: string;
}
