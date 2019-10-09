import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimInfo } from '../../papi/model';
import { ClaimActionType } from '../../claim/claim-action-type';

@Component({
    selector: 'cc-deposits-table',
    templateUrl: 'deposits-table.component.html'
})
export class DepositsTableComponent {
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
        const c = claim as any;
        this.router.navigate([`/claims/${c.partyId}/${ClaimActionType.edit}/${c.claimId}`]);
    }
}
