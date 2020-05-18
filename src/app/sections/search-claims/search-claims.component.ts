import { Component, OnInit } from '@angular/core';

import { SearchFormValue } from '../claim-search-form';
import { SearchClaimsService } from './search-claims.service';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './search-claims.component.html',
    styleUrls: ['./search-claims.component.scss']
})
export class SearchClaimsComponent implements OnInit {
    doAction$ = this.searchClaimService.doAction$;
    claims$ = this.searchClaimService.claims$;
    hasMore$ = this.searchClaimService.hasMore$;

    constructor(private searchClaimService: SearchClaimsService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.searchClaimService.errors$.subscribe(e =>
            this.snackBar.open(`An error occurred while search claims (${e})`, 'OK')
        );
    }

    search(searchFormValue: SearchFormValue) {
        this.searchClaimService.search(searchFormValue);
    }

    fetchMore() {
        this.searchClaimService.fetchMore();
    }
}
