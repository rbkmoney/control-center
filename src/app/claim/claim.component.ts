import { Component } from '@angular/core';

import { ClaimService } from './claim.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['./claim.component.css'],
})
export class ClaimComponent {

    constructor(private route: ActivatedRoute,
                private claimService: ClaimService) {
        this.route.params.subscribe((params) => {
            this.claimService.resolveClaimInfo(params.partyId, params.claimId);
        });
    }
}
