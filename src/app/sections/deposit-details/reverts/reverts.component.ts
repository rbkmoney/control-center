import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AppAuthGuardService, DepositRole } from '@cc/app/shared/services';
import { getDepositStatus } from '@cc/app/shared/utils';

import {
    DepositStatus,
    StatDeposit,
} from '../../../thrift-services/fistful/gen-model/fistful_stat';
import { CreateRevertDialogComponent } from './create-revert-dialog/create-revert-dialog.component';
import { CreateRevertDialogConfig } from './create-revert-dialog/types/create-revert-dialog-config';
import { FetchRevertsService } from './services/fetch-reverts/fetch-reverts.service';

@Component({
    selector: 'cc-reverts',
    templateUrl: 'reverts.component.html',
    styleUrls: ['reverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchRevertsService],
})
export class RevertsComponent implements OnInit {
    @Input()
    deposit: StatDeposit;

    reverts$ = this.fetchRevertsService.searchResult$;
    hasMore$ = this.fetchRevertsService.hasMore$;
    doAction$ = this.fetchRevertsService.doAction$;

    constructor(
        private fetchRevertsService: FetchRevertsService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private authGuardService: AppAuthGuardService
    ) {}

    ngOnInit() {
        this.fetchRevertsService.search({ depositID: this.deposit.id });
    }

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
            .subscribe(() => {
                this.fetchRevertsService.refresh();
            });
    }

    isCreateRevertAvailable(status: DepositStatus): boolean {
        return getDepositStatus(status) !== 'succeeded';
    }

    fetchMore() {
        this.fetchRevertsService.fetchMore();
    }

    hasNecessaryRole(): boolean {
        return this.authGuardService.userHasRoles([DepositRole.Write]);
    }
}
