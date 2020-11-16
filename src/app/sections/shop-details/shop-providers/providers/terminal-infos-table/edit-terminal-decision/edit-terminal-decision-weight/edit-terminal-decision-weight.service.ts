import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DomainTypedManager } from '../../../../../../../thrift-services/damsel';
import { EditTerminalDecision } from '../edit-terminal-decision';

@Injectable()
export class EditTerminalDecisionWeightService extends EditTerminalDecision {
    form = this.initForm();

    constructor(
        private fb: FormBuilder,
        public dtm: DomainTypedManager,
        public snackBar: MatSnackBar
    ) {
        super(dtm, snackBar);
    }

    private initForm(): FormGroup {
        return this.fb.group({
            value: '',
            property: 'weight',
        });
    }
}
