import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimService } from './claim.service';

@Component({
    templateUrl: 'claim.component.html',
    providers: [ClaimService]
})
export class ClaimComponent {
    claim$ = this.claimService.claim$;

    constructor(private route: ActivatedRoute, private claimService: ClaimService) {
        this.route.params.subscribe(params => {
            const { party_id, claim_id } = params;
            this.claimService.getClaim(party_id, new Int64(Number(claim_id)));
        });
    }
}
