import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { DomainTypedManager } from '../../../../../../thrift-services/damsel';
import { EditPriorityData } from './edit-terminal-decision-priority';
import { EditWeightData } from './edit-terminal-decision-weight';

export class EditTerminalDecision {
    private editTerminal$ = new Subject<EditPriorityData | EditWeightData>();

    form: FormGroup;
    hasError$ = new Subject<void>();

    terminalEdited$ = this.editTerminal$.pipe(
        switchMap((data) => {
            const params = {
                ...data,
                ...this.form.value,
            };
            return this.dtm.editTerminalDecisionPropertyForShop(params).pipe(
                catchError(() => {
                    this.snackBar.open('An error occurred while editing terminal decision', 'OK');
                    this.hasError$.next();
                    return of('error');
                }),
                filter((result) => result !== 'error')
            );
        }),
        shareReplay(1)
    );

    inProgress$ = progress(this.editTerminal$, merge(this.terminalEdited$, this.hasError$));

    constructor(public dtm: DomainTypedManager, public snackBar: MatSnackBar) {}

    editTerminal(data: EditPriorityData | EditWeightData) {
        this.editTerminal$.next(data);
    }
}
