import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Claim, ClaimStatus } from '../../gen-damsel/claim_management';
import { extractClaimStatus } from '../../shared/extract-claim-status';

@Component({
    selector: 'cc-claims-table',
    templateUrl: 'claims-table.component.html',
    styleUrls: ['./claims-table.component.css']
})
export class ClaimsTableComponent {
    @Input()
    claims: Claim[];

    displayedColumns = [
        'partyID',
        'claimID',
        'status',
        'revision',
        'createdAt',
        'updatedAt',
        'claimDetailButton'
    ];

    constructor(private router: Router) {}

    navigateToClaim(partyID: string, claimID: number) {
        this.router.navigate([`party/${partyID}/claim/${claimID}`]);
    }

    getClaimStatus(status: ClaimStatus) {
        return extractClaimStatus(status);
    }
}
