import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClaimSearchForm } from '@cc/app/shared/components';

import { SearchClaimsService } from './search-claims.service';

@Component({
    templateUrl: './search-claims.component.html',
    styleUrls: ['./search-claims.component.scss'],
})
export class SearchClaimsComponent implements OnInit {
    doAction$ = this.searchClaimService.doAction$;
    claims$ = this.searchClaimService.claims$;
    hasMore$ = this.searchClaimService.hasMore$;

    constructor(private searchClaimService: SearchClaimsService, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.searchClaimService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search claims (${e})`, 'OK')
        );
    }

    search({ merchant, ...v }: ClaimSearchForm): void {
        this.searchClaimService.search({ ...v, party_id: merchant?.id });
    }

    fetchMore(): void {
        this.searchClaimService.fetchMore();
    }
}
