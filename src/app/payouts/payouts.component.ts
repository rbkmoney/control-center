import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { Payout, PayoutStatus } from '../papi/model';
import { PayoutsService } from './payouts.service';
import { SearchFormService } from './search-form/search-form.service';
import { PayoutSearchParams } from '../papi/params';

@Component({
    templateUrl: 'payouts.component.html',
    styleUrls: [
        '../shared/container.css',
        './payouts.component.css'
    ],
    providers: [SearchFormService]
})
export class PayoutsComponent implements OnInit {

    isLoading: boolean;
    payouts$: Observable<Payout[]>;
    selectedPayouts: Payout[] = [];

    constructor(private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.payouts$ = this.payoutsService.payouts$;
        this.getPayouts({
            fromTime: moment().startOf('day').utc().format(),
            toTime: moment().add(1, 'days').startOf('day').utc().format(),
            minAmount: 0,
            maxAmount: 100000000000,
            status: PayoutStatus.paid
        });
    }

    tableOnChange(selectedPayouts: Payout[]) {
        this.selectedPayouts = selectedPayouts;
        this.cdRef.detectChanges();
    }

    getPayouts(params: PayoutSearchParams) {
        this.isLoading = true;
        return this.payoutsService.get(params).subscribe(() => {
            this.isLoading = false;
        }, (e) => {
            this.isLoading = false;
            const message = e.message;
            this.snackBar.open(`${message ? message : 'Error'}`, 'OK', {duration: 3000});
            console.error(e);
        });
    }
}
