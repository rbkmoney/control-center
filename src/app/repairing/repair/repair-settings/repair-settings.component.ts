import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

enum Scenario {
    // add_events = 'add_events',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    set_session_result = 'set_session_result',
}

export interface DialogData {
    scenario: string;
    code: string;
}

@Component({
    templateUrl: 'repair-settings.component.html',
    styleUrls: [],
    providers: [],
})
export class RepairSettingsComponent {
    scenarios = Object.values(Scenario);
    codes: string[] = ['unknown'];
    formGroup: FormGroup;
    autocompleteCodes$: Observable<string[]>;

    constructor(
        fb: FormBuilder,
        public dialogRef: MatDialogRef<RepairSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.formGroup = fb.group({
            scenario: [Scenario.set_session_result],
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
