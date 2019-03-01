import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';

import { Representative } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-representative',
    templateUrl: 'representative.component.html'
})
export class RepresentativeComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: Representative;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const position = get(this, 'initialValue.position', '');
        const fullName = get(this, 'initialValue.fullName', '');
        this.form.registerControl('position', this.fb.control(position, Validators.required));
        this.form.registerControl('fullName', this.fb.control(fullName, Validators.required));
        this.form.registerControl('document', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
