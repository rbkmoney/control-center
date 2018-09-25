import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-contractor',
    templateUrl: 'contractor.component.html'
})
export class ContractorComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.setControl('contractor', this.fb.group({
            legalEntity: this.fb.group({})
        }));
    }
}
