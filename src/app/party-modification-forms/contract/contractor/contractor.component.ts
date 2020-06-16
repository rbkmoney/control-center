import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Contractor } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-contractor',
    templateUrl: 'contractor.component.html',
})
export class ContractorComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: Contractor;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('legal_entity', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
