import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-contract-params',
    templateUrl: 'contract-params.component.html'
})
export class ContractParamsComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.setControl('modification', this.fb.group({
            // contractorId: this.fb.control(''),
            template: this.fb.group({}),
            paymentInstitution: this.fb.group({}),
            contractor: this.fb.group({})
        }));
    }
}
