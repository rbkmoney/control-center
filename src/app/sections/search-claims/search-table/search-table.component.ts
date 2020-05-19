import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-search-table',
    templateUrl: './search-table.component.html',
    styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent {
    @Input()
    claims: Claim[];

    displayedColumns = ['claimID', 'party', 'source', 'status', 'updatedAt', 'actions'];

    constructor(private router: Router) {}

    navigateToClaim(partyID: string, claimID: number) {
        this.router.navigate(['claims', 'party', partyID, 'claim', claimID + '']);
    }
}
