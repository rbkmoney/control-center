import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-contract-params',
    templateUrl: 'contract-params.component.html'
})
export class ContractParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        // this.form.registerControl('contractorId', this.fb.control('', Validators.required));
        this.form.registerControl('contractor', this.fb.group({}));
    }

    toggleCheckbox(e, data) {
        if (e.checked) {
            this.form.registerControl(data, this.fb.group({}));
        } else {
            this.form.removeControl(data);
        }
    }
}
