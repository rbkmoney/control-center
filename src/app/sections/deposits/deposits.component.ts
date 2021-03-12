import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DepositActions, DepositMenuItemEvent } from '@cc/app/shared/components/deposits-table';

import { CreateDepositDialogComponent } from './create-deposit-dialog/create-deposit-dialog.component';
import { ParamsStoreService } from './services/params-store/params-store.service';
import { SearchParams } from './types/search-params';
import { FetchDepositsService } from './services/fetch-deposits/fetch-deposits.service';

@Component({
    templateUrl: 'deposits.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ParamsStoreService, FetchDepositsService],
})
export class DepositsComponent implements OnInit {
    initParams$ = this.paramsStoreService.data$;

    deposits$ = this.fetchDepositsService.searchResult$;
    hasMore$ = this.fetchDepositsService.hasMore$;
    doAction$ = this.fetchDepositsService.doAction$;

    constructor(
        private dialog: MatDialog,
        private paramsStoreService: ParamsStoreService,
        private fetchDepositsService: FetchDepositsService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {
        this.fetchDepositsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search payments (${e})`, 'OK')
        );
    }

    createDeposit() {
        this.dialog
            .open(CreateDepositDialogComponent, { width: '552px', disableClose: true })
            .afterClosed()
            .pipe(filter((deposit) => !!deposit))
            .subscribe(() => {});
    }

    searchParamsUpdated(params: SearchParams) {
        this.paramsStoreService.preserve(params);
        this.fetchDepositsService.search(params);
    }

    fetchMore() {
        this.fetchDepositsService.fetchMore();
    }

    depositMenuItemSelected(depositMenuItemEvent: DepositMenuItemEvent) {
        switch (depositMenuItemEvent.action) {
            case DepositActions.navigateToDeposit:
                this.router.navigate([`/deposit/${depositMenuItemEvent.depositID}`]);
                break;
        }
    }
}
