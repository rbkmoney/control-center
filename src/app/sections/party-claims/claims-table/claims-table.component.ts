import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

    displayedColumns: string[] = ['claimID', 'status', 'createdAt', 'updatedAt', 'actions'];

    constructor(private router: Router) {}

    navigateToClaim(partyID: PartyID, claimID: ClaimID) {
        this.router.navigate([`/party/${partyID}/claim/${claimID}`]);
    }

    // FR-688
    // navigateToDeprecatedClaim(partyID: PartyID, claimID: ClaimID) {
    //     this.router.navigate([`/claim-mgt/party/${partyID}/claim/${claimID}`]);
    // }
}
