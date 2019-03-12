import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

enum Scenario {
    // add_events = 'add_events',
    set_session_result = 'set_session_result'
}

export interface DialogData {
    scenario: string;
    code: string;
}

@Component({
    templateUrl: 'repair-settings.component.html',
    styleUrls: [],
    providers: []
})
export class RepairSettingsComponent {
    scenarios = Object.values(Scenario);
    codes: string[] = ['unknown'];

    scenarioControl: FormControl;
    codeControl: FormControl;
    autocmpleteCodes$: Observable<string[]>;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<RepairSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.scenarioControl = fb.control(Scenario.set_session_result);
        this.codeControl = fb.control(this.codes[0]);
        this.autocmpleteCodes$ = this.codeControl.valueChanges.pipe(
            map(code =>
                code ? this.codes.filter(c => c.toLowerCase().indexOf(code) !== -1) : this.codes
            )
        );
    }

    cancel(): void {
        this.dialogRef.close();
    }

    getData(): DialogData {
        return {
            scenario: this.scenarioControl.value,
            code: this.codeControl.value
        };
    }
}
