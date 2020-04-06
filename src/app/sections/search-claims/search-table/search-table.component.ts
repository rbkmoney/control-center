import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Claim, Metadata } from '../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-search-table',
    templateUrl: './search-table.component.html',
    styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent {
    @Input()
    claims: Claim[];

    displayedColumns = ['claimID', 'party', 'source', 'status', 'updatedAt', 'actions'];

    constructor(private router: Router) {}

    navigateToClaim(partyID: string, claimID: number) {
        console.log(
            `[SearchTableComponent][navigateToClaim] claims/party/${partyID}/claim/${claimID}`
        );
        this.router.navigate([`claims/party/${partyID}/claim/${claimID}`]);
    }

    getSourceFromMeta(metadata: Metadata): string {
        return metadata == null
            ? 'Unknown'
            : metadata.has('Source')
            ? (metadata.get('Source') as string)
            : 'Unknown';
    }

    getMailFromClaimChangeset(claim: Claim): string {
        let res = 'Unknown';

        const changeSet = claim.changeset;
        if (changeSet.length > 0) {
            const modificationUnit = changeSet[0];
            res = modificationUnit.user_info.email;
        }

        return res;
    }
}
