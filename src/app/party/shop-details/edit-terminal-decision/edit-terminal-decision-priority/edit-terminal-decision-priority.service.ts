import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditTerminalDecision } from '../edit-terminal-decision';
import { DomainTypedManager } from '../../../../thrift';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class EditTerminalDecisionPriorityService extends EditTerminalDecision {
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
            property: 'priority'
        });
    }
}
