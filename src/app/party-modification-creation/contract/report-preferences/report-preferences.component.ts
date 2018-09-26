import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-report-preferences',
    templateUrl: 'report-preferences.component.html'
})
export class ReportPreferencesComponent {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
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
