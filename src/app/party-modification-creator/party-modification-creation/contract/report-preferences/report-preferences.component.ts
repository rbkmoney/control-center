import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { ReportPreferences } from '../../../../thrift-services/damsel/gen-model/domain';

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
        this.form.updateValueAndValidity();
    }

    toggleCheckbox(show: boolean, controlName: string, data = {}) {
        if (show) {
            this.form.registerControl(
                controlName,
                this.fb.group(this.getFormGroup(controlName, data))
            );
        } else {
            this.form.removeControl(controlName);
        }
    }

    togglePreferences() {
        const preferences = get(this, 'initialValue.service_acceptance_act_preferences', null);
        this.showPreferences = preferences !== null;
        this.toggleCheckbox(
            this.showPreferences,
            'service_acceptance_act_preferences',
            preferences
        );
    }

    private getFormGroup(type: string, data) {
        switch (type) {
            case 'service_acceptance_act_preferences':
                return {
                    schedule: this.fb.group(data.schedule || {}),
                    signer: this.fb.group({})
                };
            default:
                return {};
        }
    }
}
