import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { DepositsService } from './deposits.service';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';
import { SearchFormParams } from './search-form/search-form-params';

@Component({
    templateUrl: 'deposits.component.html'
})
export class DepositsComponent implements AfterViewInit {
    searchParams: SearchFormParams;

    formValid: boolean;

    deposits$ = this.depositsService.searchResult$;

    hasMore$ = this.depositsService.hasMore$;

    isLoading$ = this.depositsService.isLoading$;

    constructor(private depositsService: DepositsService, private dialog: MatDialog) {}

    ngAfterViewInit() {
        if (this.searchParams) {
            this.depositsService.search(this.searchParams);
        }
    }

    formValueChanges(params: SearchFormParams) {
        this.searchParams = params;
    }

    formStatusChanges(status: string) {
        this.formValid = status === 'VALID';
    }

    search() {
        if (this.searchParams) {
            this.depositsService.search(this.searchParams);
        }
    }

    fetchMore() {
        this.depositsService.fetchMore();
    }

    createDeposit() {
        this.dialog
            .open(CreateDepositComponent, { disableClose: true })
            .afterClosed()
            .subscribe(depositId => {
                const polledDepositParams: SearchFormParams = {
                    fromTime: moment()
                        .startOf('d')
                        .toISOString(),
                    toTime: moment()
                        .endOf('d')
                        .toISOString(),
                    depositId
                };
                this.depositsService.search(polledDepositParams);
            });
    }
}
