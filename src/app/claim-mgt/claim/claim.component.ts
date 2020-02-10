import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimService } from './claim.service';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { RecreateClaimService } from './recreate-claim';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.css'],
    providers: [ClaimManagementService, ClaimService, RecreateClaimService]
})
export class ClaimComponent implements OnInit {
    claim$ = this.claimService.claim$;

    constructor(private route: ActivatedRoute, private claimService: ClaimService) {}

    ngOnInit() {
        this.getClaim();
    }

    conversationChanged() {
        this.getClaim();
    }

    private getClaim() {
        this.route.params.subscribe(params => {
            const { party_id, claim_id } = params;
            this.claimService.getClaim(party_id, new Int64(Number(claim_id)));
        });
    }
}
