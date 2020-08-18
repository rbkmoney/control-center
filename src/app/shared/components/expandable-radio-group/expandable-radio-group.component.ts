import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'cc-expandable-radio-group',
    templateUrl: 'expandable-radio-group.component.html',
})
export class ExpandableRadioGroupComponent {
    form = new FormControl();

    @Input()
    formGroupName: string;

    @Input()
    values: string[];
}
