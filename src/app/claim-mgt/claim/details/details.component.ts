import { Component, Input } from '@angular/core';

import { Claim, ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { extractClaimStatus } from '../../../shared/extract-claim-status';

@Component({
    selector: 'cc-claim-details',
    templateUrl: 'details.component.html'
})
export class DetailsComponent {
    @Input() claim: Claim;

    extractClaimStatus(status: ClaimStatus) {
        return extractClaimStatus(status);
    }
}
