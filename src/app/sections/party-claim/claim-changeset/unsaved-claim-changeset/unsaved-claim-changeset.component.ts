import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ClaimChangeset } from '../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-unsaved-claim-changeset',
    templateUrl: 'unsaved-claim-changeset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsavedClaimChangesetComponent {
    @Input()
    changeset: ClaimChangeset;
}
