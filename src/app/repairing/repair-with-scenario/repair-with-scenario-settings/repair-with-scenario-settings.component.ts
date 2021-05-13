import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

enum Scenario {
    // complex = 'complex',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fail_pre_processing = 'fail_pre_processing',
    // skip_inspector = 'skip_inspector',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fail_session = 'fail_session',
}

export interface DialogData {
    scenario: string;
    code: string;
}

@Component({
    templateUrl: 'repair-with-scenario-settings.component.html',
    styleUrls: [],
    providers: [],
})
export class RepairWithScenarioSettingsComponent {
    scenarios = Object.values(Scenario);
    codes: string[] = ['authorization_failed'];
    formGroup: FormGroup;
    autocompleteCodes$: Observable<string[]>;

    constructor(
        fb: FormBuilder,
        public dialogRef: MatDialogRef<RepairWithScenarioSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.formGroup = fb.group({
            scenario: [Scenario.fail_pre_processing],
            code: [this.codes[0]],
        });
        this.autocompleteCodes$ = this.formGroup.valueChanges.pipe(
            map(({ code }) =>
                code ? this.codes.filter((c) => c.toLowerCase().indexOf(code) !== -1) : this.codes
            )
        );
    }

    cancel(): void {
        this.dialogRef.close();
    }

    getData(): DialogData {
        return {
            scenario: this.formGroup.value.scenario,
            code: this.formGroup.value.code,
        };
    }
}
