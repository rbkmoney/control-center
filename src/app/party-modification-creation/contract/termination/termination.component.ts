import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { ContractTermination } from '../../../gen-damsel/payment_processing';

@Component({
    selector: 'cc-termination',
    templateUrl: 'termination.component.html'
})
export class TerminationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractTermination;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const reason = get(this, 'initialValue.reason', '');
        this.form.registerControl('reason', this.fb.control(reason));
    }
}
