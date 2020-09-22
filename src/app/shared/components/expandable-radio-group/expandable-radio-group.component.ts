import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    Optional,
    Self,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { CustomFormControl, RadioButtonObject } from '../utils';

@Component({
    selector: 'cc-expandable-radio-group',
    templateUrl: 'expandable-radio-group.component.html',
    styleUrls: ['expandable-radio-group.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class ExpandableRadioGroupComponent extends CustomFormControl implements OnChanges {
    form = new FormControl();

    @Input()
    values: RadioButtonObject[];

    control = new FormControl();

    visibleValues: RadioButtonObject[];

    isExpandable = false;

    isExpanded = false;

    constructor(
        focusMonitor: FocusMonitor,
        elementRef: ElementRef<HTMLElement>,
        platform: Platform,
        @Optional() @Self() ngControl: NgControl,
        autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective
    ) {
        super(
            focusMonitor,
            elementRef,
            platform,
            ngControl,
            autofillMonitor,
            defaultErrorStateMatcher,
            parentForm,
            parentFormGroup
        );
    }

    ngOnChanges(changes?: SimpleChanges) {
        this.isExpandable = changes?.values?.currentValue > 4;
        this.isExpanded =
            this.ngControl.value &&
            !this.values
                .slice(0, 2)
                .map((v) => v.value)
                .includes(this.ngControl.value);
        this.changeVisibility(this.isExpanded);
    }

    changeVisibility(value: boolean) {
        this.isExpanded = value;
        if (value) {
            this.visibleValues = this.values;
        } else {
            this.visibleValues = this.values.slice(0, 2);
        }
    }
}
