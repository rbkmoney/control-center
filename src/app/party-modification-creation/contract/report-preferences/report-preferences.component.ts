import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportPreferences } from '../../../gen-damsel/domain';
import get from 'lodash-es/get';

@Component({
    selector: 'cc-report-preferences',
    templateUrl: 'report-preferences.component.html'
})
export class ReportPreferencesComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ReportPreferences;

    showPreferences = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.togglePreferences();
    }

    toggleCheckbox(show: boolean, controlName: string, data = {}) {
        if (show) {
            this.form.registerControl(controlName, this.fb.group(this.getFormGroup(controlName, data)));
        } else {
            this.form.removeControl(controlName);
        }
    }

    togglePreferences() {
        const preferences = get(this, 'initialValue.serviceAcceptanceActPreferences', null);
        this.showPreferences = preferences !== null;
        this.toggleCheckbox(this.showPreferences, 'serviceAcceptanceActPreferences', preferences);
    }

    private getFormGroup(type: string, data) {
        switch (type) {
            case 'serviceAcceptanceActPreferences':
                return {
                    schedule: this.fb.group(data.schedule || {}),
                    signer: this.fb.group({})
                };
            default:
                return {};
        }
    }
}
