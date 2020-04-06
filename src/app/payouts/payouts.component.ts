import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Payout } from '../papi/model';
import { PayoutsService } from './payouts.service';
import { SearchFormService } from './search-form/search-form.service';
import { PayoutSearchParams } from '../papi/params';

@Component({
    templateUrl: 'payouts.component.html',
    styleUrls: ['./payouts.component.css'],
    providers: [SearchFormService]
})
export class PayoutsComponent {
    isLoading: boolean;
    payouts: Payout[];
    selectedPayouts: Payout[] = [];
    formValid: boolean;
    searchParams: PayoutSearchParams;

    constructor(private payoutsService: PayoutsService, private snackBar: MatSnackBar) {}

    formValueChanges(params: PayoutSearchParams) {
        this.searchParams = params;
    }

    formStatusChanges(status: string) {
        this.formValid = status === 'VALID';
    }

    tableOnChange(selectedPayouts: Payout[]) {
        this.selectedPayouts = selectedPayouts;
    }

    search() {
        this.isLoading = true;
        this.payoutsService.get(this.searchParams).subscribe(
            payouts => {
                this.isLoading = false;
                this.payouts = payouts;
            },
            () => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while search payouts', 'OK');
            }
        );
    }
}
