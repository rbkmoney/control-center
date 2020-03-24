import { Component, Input } from '@angular/core';

import { Claim, ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';

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

    navigateToClaim(partyID: PartyID, claimID: ClaimID) {
        console.log(partyID, claimID.toNumber(), '===========>>>');
    }
}
