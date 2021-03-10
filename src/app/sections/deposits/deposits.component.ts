import { ChangeDetectionStrategy, Component } from '@angular/core';

import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateDepositDialogComponent } from './create-deposit-dialog/create-deposit-dialog.component';

@Component({
    templateUrl: 'deposits.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositsComponent {
    constructor(private dialog: MatDialog) {}

    createDeposit() {
        this.dialog
            .open(CreateDepositDialogComponent, { disableClose: true })
            .afterClosed()
            .pipe(filter((deposit) => !!deposit))
            .subscribe(() => {});
    }
}
