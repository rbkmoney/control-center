import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import { DomainTypedManager } from '../../../thrift-services';
import { EditTerminalDecisionPropertyParams } from '../../../thrift-services/damsel/operations/edit-terminal-decision-property-params';
import { EditPriorityData } from './edit-terminal-decision-priority/edit-terminal-decision-priority.component';

export interface EditTerminalDecisionFormValues {
    property: string;
    value: any;
}

export class EditTerminalDecision {
    form: FormGroup;
    isLoading$: Subject<boolean> = new Subject();
    terminalChanged: EventEmitter<void> = new EventEmitter();

    constructor(public dtm: DomainTypedManager, public snackBar: MatSnackBar) {}

    edit(data: EditPriorityData, formValues?: EditTerminalDecisionFormValues) {
        const params = {
            ...data,
            ...this.form.getRawValue(),
            ...formValues
        } as EditTerminalDecisionPropertyParams;
        this.isLoading$.next(true);
        this.dtm.editTerminalDecisionPropertyForShop(params).subscribe(
            () => {
                this.terminalChanged.emit();
                this.isLoading$.next(false);
                this.snackBar.open('Terminal decision successfully edited', 'OK', {
                    duration: 3000
                });
            },
            e => {
                this.isLoading$.next(false);
                this.snackBar.open('An error occurred while while editing terminal decision', 'OK');
                console.error(e);
            }
        );
    }
}
