import { Component, OnInit } from '@angular/core';

import { ClaimsService } from './claims.service';
import { SearchFormValue } from './search-form/search-form-value';
import { ClaimStatus } from '../papi/model/claim-statuses';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: 'claims.component.html',
    styleUrls: []
})
export class ClaimsComponent implements OnInit {
    isLoading$ = this.claimService.isLoading$;
    claims$ = this.claimService.claims$.pipe(
        map(r => {
            console.log(r);
            return r;
        })
    );
    hasMore$ = this.claimService.hasMore$;

    constructor(private claimService: ClaimsService) {}

    ngOnInit(): void {
        this.search({ statuses: [ClaimStatus.pending] });
    }

    search(searchFormValue: SearchFormValue) {
        this.claimService.search(searchFormValue);
    }

    fetchMore() {
        this.claimService.fetchMore();
    }
}
