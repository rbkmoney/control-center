import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Claim } from '../../../../thrift-services/damsel/gen-model/claim_management';

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
        'actions'
    ];

    constructor(private router: Router) {}

    navigateToClaim(partyID: string, claimID: number) {
        this.router.navigate([`claim-mgt/party/${partyID}/claim/${claimID}`]);
    }
}
