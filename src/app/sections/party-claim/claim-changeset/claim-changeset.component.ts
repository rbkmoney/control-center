import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ClaimChangeset } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo, ChangesetInfoType, toChangesetInfos } from './changeset-infos';

@Component({
    selector: 'cc-claim-changeset',
    templateUrl: 'claim-changeset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimChangesetComponent {
    @Input()
    createdAt: string;

    @Input()
    set changeset(v: ClaimChangeset) {
        this.changesetInfos$.next(toChangesetInfos(v));
    }

    @Input()
    partyID: PartyID;

    changesetInfoType = ChangesetInfoType;
    changesetInfos$ = new BehaviorSubject<ChangesetInfo[]>([]);
    filteredChangesetInfos: ChangesetInfo[] = [];

    simpleTrackBy(index: number): number {
        return index;
    }

    filterChange($event: ChangesetInfo[]) {
        this.filteredChangesetInfos = $event;
    }
}
