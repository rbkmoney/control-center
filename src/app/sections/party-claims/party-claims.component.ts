import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { PartyClaimsService } from './party-claims.service';
import { SearchFormValue } from './search-form-value';

@Component({
    templateUrl: 'party-claims.component.html',
    providers: [PartyClaimsService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartyClaimsComponent implements OnInit {
    doAction$ = this.partyClaimsService.doAction$;
    claims$ = this.partyClaimsService.searchResult$;
    hasMore$ = this.partyClaimsService.hasMore$;

    constructor(private partyClaimsService: PartyClaimsService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.partyClaimsService.errors$.subscribe(e =>
            this.snackBar.open(`An error occurred while search claim (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.partyClaimsService.fetchMore();
    }

    search(v: SearchFormValue) {
        this.partyClaimsService.search(v);
    }
}
