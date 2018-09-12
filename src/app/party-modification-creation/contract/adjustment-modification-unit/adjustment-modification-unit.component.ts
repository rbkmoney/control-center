import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        this.form.setControl('adjustmentId', this.fb.control('', Validators.required));
        this.form.setControl('modification', this.fb.group({}));
    }
}
