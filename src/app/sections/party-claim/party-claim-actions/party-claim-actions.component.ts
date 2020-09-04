import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-party-claim-actions',
    templateUrl: 'party-claim-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimActionsComponent {
    @Input()
    partyID: PartyID;

    @Input()
    claimID: string;
}
