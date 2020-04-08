import { AfterViewInit, Component } from '@angular/core';

import { DepositsService } from './deposits.service';
import { SearchFormParams } from './search-form/search-form-params';

@Component({
    templateUrl: 'deposits.component.html',
})
export class DepositsComponent implements AfterViewInit {
    searchParams: SearchFormParams;

    formValid: boolean;

    deposits$ = this.depositsService.searchResult$;

    hasMore$ = this.depositsService.hasMore$;

    isLoading$ = this.depositsService.isLoading$;

    constructor(private depositsService: DepositsService) {}

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
        this.depositsService.createDeposit();
    }
}
