import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-adjustment-modification',
    templateUrl: 'adjustment-modification.component.html'
})
export class AdjustmentModificationComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('creation', this.fb.group({}));
    }
}
