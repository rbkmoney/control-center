import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pluck } from 'rxjs/operators';

import { ReceiveDepositService } from './services/receive-deposit/receive-deposit.service';

@Component({
    templateUrl: 'deposit-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceiveDepositService],
})
export class DepositDetailsComponent implements OnInit {
    deposit$ = this.fetchDepositService.deposit$;

    constructor(
        private fetchDepositService: ReceiveDepositService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.deposit$.subscribe((d) => console.log('deposit is', d));
        this.route.params
            .pipe(pluck('depositID'))
            .subscribe((depositID) => this.fetchDepositService.receiveDeposit(depositID));
        this.fetchDepositService.hasError$.subscribe(() =>
            this.snackBar.open('An error occurred while deposit receiving')
        );
    }
}
