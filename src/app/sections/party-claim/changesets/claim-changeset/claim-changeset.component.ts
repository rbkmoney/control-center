import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ClaimChangeset } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { toModificationUnitInfos } from './to-modification-unit-infos';

@Component({
    selector: 'cc-claim-changeset',
    templateUrl: 'claim-changeset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimChangesetComponent implements OnChanges {
    @Input()
    createdAt: string;

    @Input()
    changeset: ClaimChangeset;

    ngOnChanges(changes: SimpleChanges): void {
        const { changeset } = changes;
        if (changeset.currentValue) {
            console.log(toModificationUnitInfos(changeset.currentValue));
        }
    }
}
