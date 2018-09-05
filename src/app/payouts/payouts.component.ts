import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Payout, PayoutStatus } from '../papi/model';
import { PayoutsService } from './payouts.service';
import { SearchFormService } from './search-form/search-form.service';

@Component({
    templateUrl: 'payouts.component.html',
    styleUrls: [
        '../shared/container.css',
        './payouts.component.css'],
    providers: [SearchFormService]
})
export class PayoutsComponent implements OnInit {

    isLoading: boolean;
    payouts$: Observable<Payout[]>;
    selectedPayouts: Payout[] = [];

    constructor(private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                private cdRef: ChangeDetectorRef,
                private searchService: SearchFormService) {
    }

    ngOnInit() {
        this.payouts$ = this.payoutsService.payouts$;
        this.isLoading = true;
        this.payoutsService.get(this.searchService.formValueToSearchParams({
                fromTime: moment().subtract(1, 'weeks'),
                toTime: moment().add(1, 'days')
            }
        )).subscribe(() => {
            this.isLoading = false;
        }, (e) => {
            this.isLoading = false;
            const message = e.message;
            this.snackBar.open(`${message ? message : 'Error'}`, 'OK', {duration: 3000});
            console.error(e);
        });
    }

    tableOnChange(selectedPayouts: Payout[]) {
        this.selectedPayouts = selectedPayouts;
        this.cdRef.detectChanges();
    }
}
