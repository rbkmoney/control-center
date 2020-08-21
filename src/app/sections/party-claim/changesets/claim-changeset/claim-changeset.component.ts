import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ClaimChangeset } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo, ChangesetInfoType, toChangesetInfos } from './changeset-infos';

@Component({
    selector: 'cc-claim-changeset',
    templateUrl: 'claim-changeset.component.html',
    styleUrls: ['claim-changeset.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimChangesetComponent implements OnChanges {
    @Input()
    createdAt: string;

    @Input()
    changeset: ClaimChangeset;

    @Input()
    partyID: PartyID;

    changesetInfoType = ChangesetInfoType;
    changesetInfos$ = new BehaviorSubject<ChangesetInfo[]>([]);
    filteredChangesetInfos$ = new BehaviorSubject<ChangesetInfo[]>([]);

    simpleTrackBy(index: number): number {
        return index;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { changeset } = changes;
        if (changeset.currentValue) {
            this.changesetInfos$.next(toChangesetInfos(changeset.currentValue));
        }
    }

    filterChange($event: ChangesetInfo[]) {
        this.filteredChangesetInfos$.next($event);
    }
}
