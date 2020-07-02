import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimActionType } from '../../claim/claim-action-type';
import { ClaimInfo } from '../../papi/model';

@Component({
    selector: 'cc-claims-table',
    templateUrl: 'claims-table.component.html',
    styleUrls: ['./claims-table.component.scss'],
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
        'claimDetailButton',
    ];

    constructor(private router: Router) {}

    navigateToClaim(claim: ClaimInfo) {
        const c = claim as any;
        this.router.navigate([`/claims/${c.partyId}/${ClaimActionType.edit}/${c.claimId}`]);
    }
}
