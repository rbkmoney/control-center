import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';

@Component({
    selector: 'cc-adjustment-modification-unit',
    templateUrl: 'adjustment-modification-unit.component.html'
})
export class AdjustmentModificationUnitComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('adjustmentId', this.fb.control('', Validators.required));
        this.form.registerControl('modification', this.fb.group({}));
    }

    generate() {
        this.form.setValue({...this.form.value, adjustmentId: uuid()});
    }
}
