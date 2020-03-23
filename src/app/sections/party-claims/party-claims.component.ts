import { Component, OnInit } from '@angular/core';

import { PartyClaimsService } from './party-claims.service';
import { SearchFormValue } from './search-form-value';

@Component({
    templateUrl: 'party-claims.component.html',
    styleUrls: ['party-claims.component.scss'],
    providers: [PartyClaimsService]
})
export class PartyClaimsComponent implements OnInit {
    isLoading$ = this.partyClaimsService.isLoading$;
    claims$ = this.partyClaimsService.claims$;
    hasMore$ = this.partyClaimsService.hasMore$;

    constructor(private partyClaimsService: PartyClaimsService) {}

    fetchMore() {
        this.partyClaimsService.fetchMore();
    }

    search($event: SearchFormValue) {
        this.partyClaimsService.search($event);
    }

    ngOnInit(): void {
        this.partyClaimsService.search({});
    }
}
