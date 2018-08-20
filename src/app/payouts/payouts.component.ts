import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { PayoutSearchParams } from '../papi/params';
import { PayoutsService } from '../papi/payouts.service';
import { Payout } from '../papi/model';

@Component({
    templateUrl: 'payouts.component.html',
    styleUrls: ['../shared/container.css']
})
export class PayoutsComponent implements OnInit {

    public isLoading: boolean;
    public payouts: Payout[];

    constructor(private payoutsService: PayoutsService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.search();
    }

    search(params?: PayoutSearchParams) {
        this.isLoading = true;
        this.payoutsService.getPayouts(params).subscribe(payoutsResponse => {
            this.isLoading = false;
            this.payouts = payoutsResponse.payouts;
        }, (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.snackBar.open(`${error.status}: ${error.message}`, 'OK');
        });
    }
}
