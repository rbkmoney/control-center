import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-party-claim-title',
    templateUrl: 'party-claim-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimTitleComponent {
    @Input()
    status: ClaimStatus;

    @Input()
    claimID: string;
}
