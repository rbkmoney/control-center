import { Component } from '@angular/core';

import { ClaimsService } from './claims.service';
import { SearchFormValue } from './search-form/search-form-value';

@Component({
    templateUrl: 'claims.component.html',
})
export class ClaimsComponent {
    isLoading$ = this.claimService.isLoading$;
    claims$ = this.claimService.claims$;
    hasMore$ = this.claimService.hasMore$;

    constructor(private claimService: ClaimsService) {}

    search(searchFormValue: SearchFormValue) {
        this.claimService.search(searchFormValue);
    }

    fetchMore() {
        this.claimService.fetchMore();
    }
}
