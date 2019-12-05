import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from './claim.service';

@Component({
    templateUrl: 'claim.component.html',
    providers: [ClaimService]
})
export class ClaimComponent {
    claim$ = this.claimService.claim$;

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimService
    ) {
        this.route.params.subscribe(params => {
            const { party_id, claim_id } = params;
            this.claimService.getClaim(party_id, Number(claim_id));
        });
    }
}
