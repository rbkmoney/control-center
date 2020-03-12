import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PartyClaimsService } from './party-claims.service';

@Component({
    templateUrl: 'party-claims.component.html'
})
export class PartyClaimsComponent implements OnInit {
    isLoading$ = this.partyClaimsService.isLoading$;
    claims$ = this.partyClaimsService.claims$;
    hasMore$ = this.partyClaimsService.hasMore$;

    constructor(private partyClaimsService: PartyClaimsService, private route: ActivatedRoute) {}

    fetchMore() {
        this.partyClaimsService.fetchMore();
    }

    ngOnInit(): void {
        this.route.params.subscribe(({ partyID }) => {
            this.partyClaimsService.search({ party_id: partyID });
        });
    }
}
