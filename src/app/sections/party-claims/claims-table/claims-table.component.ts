import { Component, Input } from '@angular/core';

import {
    Claim,
    ClaimID,
    ClaimStatus as UnionClaimStatus
} from '../../../thrift-services/damsel/gen-model/claim_management';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { getClaimSource } from './get-claim-source';

@Component({
    templateUrl: 'claims-table.component.html',
    selector: 'cc-claims-table',
    styleUrls: ['claims-table.component.scss']
})
export class ClaimsTableComponent {
    @Input()
    claims: Claim[];

    displayedColumns: string[] = [
        'claimID',
        'source',
        'status',
        'createdAt',
        'updatedAt',
        'actions'
    ];

    extractClaimStatus(status: UnionClaimStatus): string {
        return extractClaimStatus(status);
    }

    navigateToClaim(partyID: PartyID, claimID: ClaimID) {
        console.log(partyID, claimID.toNumber(), '===========>>>');
    }
}
