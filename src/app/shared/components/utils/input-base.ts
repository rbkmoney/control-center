import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import {
    CanUpdateErrorStateCtor,
    ErrorStateMatcher,
    mixinErrorState,
} from '@angular/material/core';

export class InputBase {
    constructor(
        public _defaultErrorStateMatcher: ErrorStateMatcher,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public ngControl: NgControl
    ) {}
}

export const InputMixinBase: CanUpdateErrorStateCtor & typeof InputBase = mixinErrorState(
    InputBase
);
