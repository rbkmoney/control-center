import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Claim, ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-claims-table',
    templateUrl: 'claims-table.component.html',
    styleUrls: ['claims-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        'actions',
    ];

    navigateToClaim(partyID: PartyID, claimID: ClaimID) {
        console.log(partyID, claimID.toNumber(), '===========>>>');
    }
}
