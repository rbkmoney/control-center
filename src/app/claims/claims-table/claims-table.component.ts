import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimInfo } from '../../backend/model';

@Component({
    selector: 'cc-claims-table',
    templateUrl: 'claims-table.component.html',
    styleUrls: ['./claims-table.component.css']
})
export class ClaimsTableComponent {

    @Input()
    claims: ClaimInfo[];

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

    navigateToClaim(claim: ClaimInfo) {
        this.router.navigate([`/claims/${claim.partyId}/${claim.claimId}`]);
    }
}
