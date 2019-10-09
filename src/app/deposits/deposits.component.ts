import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DepositsService } from './deposits.service';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';

@Component({
    templateUrl: 'deposits.component.html'
})
export class DepositsComponent implements OnInit {

    deposits = this.depositsService.deposits$;

    continuationToken$ = this.depositsService.continuationToken$;

    constructor(
        private depositsService: DepositsService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.fetchDeposits();
    }

    fetchDeposits() {
        this.depositsService.fetchDeposits({ fromTime: '2019-09-09T00:00:00Z', toTime: '2019-10-10T00:00:00Z' });
    }

    createDepositDialog() {
        this.dialog.open(CreateDepositComponent);
    }

}
