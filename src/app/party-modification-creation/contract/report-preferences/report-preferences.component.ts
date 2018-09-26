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
        this.form.registerControl('serviceAcceptanceActPreferences', this.fb.group({
            schedule: this.fb.group({}),
            signer: this.fb.group({})
        }));
    }

    toggleCheckbox(e, data) {
        if (e.checked) {
            this.form.registerControl(data, this.fb.group({...this.getFormGroup(data)}));
        } else {
            this.form.removeControl(data);
        }
    }

    private getFormGroup(type: string) {
        switch (type) {
            case 'serviceAcceptanceActPreferences':
                return {
                    schedule: this.fb.group({}),
                    signer: this.fb.group({})
                };
            default:
                return {};
        }
    }
}
