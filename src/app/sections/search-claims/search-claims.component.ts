import { Component } from '@angular/core';

import { SearchFormValue } from './search-form/search-form-value';
import { SearchClaimsService } from './search-claims.service';

@Component({
    templateUrl: './search-claims.component.html',
    styleUrls: ['./search-claims.component.scss']
})
export class SearchClaimsComponent {
    isLoading$ = this.searchClaimService.isLoading$;
    claims$ = this.searchClaimService.claims$;
    hasMore$ = this.searchClaimService.hasMore$;

    constructor(private searchClaimService: SearchClaimsService) {}

    search(searchFormValue: SearchFormValue) {
        this.searchClaimService.search(searchFormValue);
    }

    fetchMore() {
        this.searchClaimService.fetchMore();
    }
}
