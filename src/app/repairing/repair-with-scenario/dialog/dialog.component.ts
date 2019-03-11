import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

enum Scenario {
    // complex = 'complex',
    fail_pre_processing = 'fail_pre_processing',
    // skip_inspector = 'skip_inspector',
    fail_session = 'fail_session'
}

export interface DialogData {
    scenario: string;
    code: string;
}

@Component({
    templateUrl: 'dialog.component.html',
    styleUrls: [],
    providers: []
})
export class DialogComponent {
    scenarios = Object.values(Scenario);
    codes: string[] = ['authorization_failed'];

    scenarioControl: FormControl;
    codeControl: FormControl;
    filteredCodes: Observable<string[]>;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.scenarioControl = fb.control(Scenario.fail_pre_processing);
        this.codeControl = fb.control(this.codes[0]);
        this.filteredCodes = this.codeControl.valueChanges.pipe(
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
