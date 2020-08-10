import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ClaimChangeset } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType, toChangesetInfos } from './changeset-infos';

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

    changesetInfos: ChangesetInfo[];

    changesetInfoTypes = ChangesetInfoType;

    simpleTrackBy(index: number): number {
        return index;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { changeset } = changes;
        if (changeset.currentValue) {
            this.changesetInfos = toChangesetInfos(changeset.currentValue);
        }
    }
}
