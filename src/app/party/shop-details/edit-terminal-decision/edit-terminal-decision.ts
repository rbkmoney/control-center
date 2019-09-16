import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

import { DomainTypedManager } from '../../../thrift';
import { EditTerminalDecisionPropertyParams } from '../../../thrift/operations/edit-terminal-decision-property-params';
import { EditPriorityData } from './edit-terminal-decision-priority/edit-terminal-decision-priority.component';

export class EditTerminalDecision {
    form: FormGroup;
    isLoading: Subject<boolean> = new Subject();

    constructor(public dtm: DomainTypedManager, public snackBar: MatSnackBar) {}

    edit(data: EditPriorityData) {
        const params = {
            ...data,
            ...this.form.getRawValue()
        } as EditTerminalDecisionPropertyParams;
        this.isLoading.next(true);
        this.dtm.editTerminalDecisionProperty(params).subscribe(
            () => {
                this.isLoading.next(false);
                this.snackBar.open('Terminal decision successfully edited', 'OK', {
                    duration: 3000
                });
            },
            e => {
                this.isLoading.next(false);
                this.snackBar.open('An error occurred while while editing terminal decision', 'OK');
                console.error(e);
            }
        );
    }
}