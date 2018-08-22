import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

import { PayoutSearchParams } from '../papi/params';
import { PayoutsService } from '../papi/payouts.service';
import { Payout } from '../papi/model';
import { CreatePayoutComponent } from './create-payout/create-payout.component';

@Component({
    templateUrl: 'payouts.component.html',
    styleUrls: ['../shared/container.css', './payouts.component.css']
})
export class PayoutsComponent implements OnInit {

    isLoading: boolean;
    payouts: Payout[];
    hasSelected: boolean;
    selectedPayoutsIds: string[];
    lastSearchParams: PayoutSearchParams;

    constructor(private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                private dialogRef: MatDialog) {
    }

    ngOnInit() {
        this.search();
    }

    search(params?: PayoutSearchParams) {
        this.lastSearchParams = params;
        this.isLoading = true;
        this.payoutsService.getPayouts(this.convertToParams(params)).subscribe((payoutsResponse) => {
            this.isLoading = false;
            this.payouts = payoutsResponse.payouts;
        }, (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.snackBar.open(`${error.status}: ${error.message}`, 'OK');
        });
    }

    tableOnChange(selectedPayouts: Payout[]) {
        this.hasSelected = selectedPayouts.length > 0;
        this.selectedPayoutsIds = selectedPayouts.reduce((acc, current) => acc.concat(current.id), []);
    }

    pay() {
        this.payoutsService.createPayoutsReports(this.selectedPayoutsIds).subscribe(() => {
            this.handleSuccess('Successfully payed');
            this.search(this.lastSearchParams);
        }, (e) => this.handleError(e));
    }

    confirmPayouts() {
        this.payoutsService.acceptPayouts(this.selectedPayoutsIds).subscribe(() => {
            this.handleSuccess('Successfully confirmed');
            this.search(this.lastSearchParams);
        }, (e) => this.handleError(e));
    }

    createPayout() {
        const dialog = this.dialogRef.open(CreatePayoutComponent, {
            width: '720px',
            disableClose: true
        });
        dialog.afterClosed().subscribe(() => {
            this.search(this.lastSearchParams);
        }, (e) => this.handleError(e));
    }

    private handleError(e: HttpErrorResponse) {
        const message = e.message;
        this.snackBar.open(`${message ? message : 'Error'}`, 'OK');
        console.error(e);
    }

    private handleSuccess(message: string) {
        this.snackBar.open(`${message ? message : 'Success'}`, 'OK');
    }

    private convertToParams(formValues: any): PayoutSearchParams {
        if (formValues) {
            if (formValues.fromTime) {
                formValues.fromTime = moment(formValues.fromTime).startOf('day').utc().format();
            }
            if (formValues.toTime) {
                formValues.toTime = moment(formValues.toTime).endOf('day').utc().format();
            }
        }
        return formValues;
    }
}
