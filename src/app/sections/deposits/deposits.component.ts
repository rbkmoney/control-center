import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { CreateDepositDialogComponent } from './create-deposit-dialog/create-deposit-dialog.component';
import { ParamsStoreService } from './services/params-store/params-store.service';
import { SearchParams } from './types/search-params';

@Component({
    templateUrl: 'deposits.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ParamsStoreService],
})
export class DepositsComponent {
    initParams$ = this.paramsStoreService.data$;

    constructor(private dialog: MatDialog, private paramsStoreService: ParamsStoreService) {}

    createDeposit() {
        this.dialog
            .open(CreateDepositDialogComponent, { width: '552px', disableClose: true })
            .afterClosed()
            .pipe(filter((deposit) => !!deposit))
            .subscribe(() => {});
    }

    searchParamsUpdated($event: SearchParams) {
        this.paramsStoreService.preserve($event);
    }
}
