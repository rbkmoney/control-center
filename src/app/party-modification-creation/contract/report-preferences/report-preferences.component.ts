import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-report-preferences',
    templateUrl: 'report-preferences.component.html'
})
export class ReportPreferencesComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.form.registerControl('serviceAcceptanceActPreferences', this.fb.group({
            schedule: this.fb.group({}),
            signer: this.fb.group({})
        }));
        this.cdr.detectChanges();
    }
}
