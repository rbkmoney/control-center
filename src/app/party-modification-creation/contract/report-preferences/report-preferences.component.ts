import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-report-preferences',
    templateUrl: 'report-preferences.component.html'
})
export class ReportPreferencesComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.setControl('schedule', this.fb.group({}));
        this.form.setControl('signer', this.fb.group({}));
    }
}
