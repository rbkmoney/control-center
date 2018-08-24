import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { Payout, PayoutStatus } from '../papi/model';
import { PayoutsService } from './payouts.service';

@Component({
    templateUrl: 'payouts.component.html',
    styleUrls: [
        '../shared/container.css',
        './payouts.component.css']
})
export class PayoutsComponent implements OnInit {

    isLoading: boolean;
    payouts$: Observable<Payout[]>;
    selectedPayoutsIds: string[] = [];

    constructor(private payoutsService: PayoutsService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.payouts$ = this.payoutsService.payouts$;
        this.isLoading = true;
        this.payoutsService.get({status: PayoutStatus.unpaid}).subscribe(() => {
            this.isLoading = false;
        }, (e) => {
            this.isLoading = false;
            const message = e.message;
            this.snackBar.open(`${message ? message : 'Error'}`, 'OK', {duration: 3000});
            console.error(e);
        });
    }

    tableOnChange(selectedPayouts: Payout[]) {
        this.selectedPayoutsIds = selectedPayouts.reduce((acc, current) => acc.concat(current.id), []);
    }
}
