import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contractor } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-contractor',
    templateUrl: 'contractor.component.html'
})
export class ContractorComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: Contractor;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('legalEntity', this.fb.group({}));
    }
}
