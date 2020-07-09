import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ClaimChangeset } from '../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-claim-changeset',
    templateUrl: 'claim-changeset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimChangesetComponent {
    @Input()
    created_at: string;

    @Input()
    changeset: ClaimChangeset;
}
