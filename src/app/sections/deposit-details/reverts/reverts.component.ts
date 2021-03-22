import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { StatDeposit } from '../../../thrift-services/fistful/gen-model/fistful_stat';
import { CreateRevertDialogComponent } from './create-revert-dialog/create-revert-dialog.component';
import { CreateRevertDialogConfig } from './create-revert-dialog/types/create-revert-dialog-config';

@Component({
    selector: 'cc-reverts',
    templateUrl: 'reverts.component.html',
    styleUrls: ['reverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevertsComponent implements OnInit {
    @Input()
    deposit: StatDeposit;

    constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit() {}

    createRevert() {
        this.dialog
            .open<CreateRevertDialogComponent, CreateRevertDialogConfig>(
                CreateRevertDialogComponent,
                {
                    width: '552px',
                    disableClose: true,
                    data: {
                        depositID: this.deposit.id,
                        currency: this.deposit.currency_symbolic_code,
                    },
                }
            )
            .afterClosed()
            .pipe(filter((revert) => !!revert))
            .subscribe(() => {});
    }
}
