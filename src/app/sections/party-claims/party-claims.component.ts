import { Component, OnInit } from '@angular/core';

import { PartyClaimsService } from './party-claims.service';

@Component({
    templateUrl: 'party-claims.component.html'
})
export class PartyClaimsComponent implements OnInit {
    isLoading$ = this.partyClaimsService.isLoading$;
    claims$ = this.partyClaimsService.claims$;
    hasMore$ = this.partyClaimsService.hasMore$;

    constructor(private partyClaimsService: PartyClaimsService) {}

    fetchMore() {
        this.partyClaimsService.fetchMore();
    }

    ngOnInit(): void {
        this.partyClaimsService.search({});
    }
}
