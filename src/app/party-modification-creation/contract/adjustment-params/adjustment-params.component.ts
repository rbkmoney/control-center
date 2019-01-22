import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-contract-adjustment-params',
    templateUrl: 'adjustment-params.component.html'
})
export class AdjustmentParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('template', this.fb.group({}));
    }
}
