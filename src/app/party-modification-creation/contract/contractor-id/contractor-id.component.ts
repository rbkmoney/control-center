import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-contractor-id',
    templateUrl: 'contractor-id.component.html'
})
export class ContractorIdComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('modification', this.fb.control('', Validators.required));
        this.form.updateValueAndValidity();
    }
}
