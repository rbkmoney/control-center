import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ClaimInfo } from '../papi/model';
import { ClaimsService } from './claims.service';
import { SearchFormValue } from './search-form/search-form-value';

@Component({
    templateUrl: 'claims.component.html',
    styleUrls: []
})
export class ClaimsComponent {
    isLoading$ = this.claimService.isLoading$;
    claims$: Observable<ClaimInfo[]>;
    hasMore$ = this.claimService.hasMore$;

    constructor(private claimService: ClaimsService) {
        this.claims$ = this.claimService.claims$;
    }

    search(params: SearchFormValue) {
        this.claimService.search(params);
    }

    fetchMore() {
        this.claimService.fetchMore();
    }
}
