import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ClaimChangeset } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfoType } from './changeset-infos';
import { ClaimChangesetService } from './claim-changeset.service';

@Component({
    selector: 'cc-claim-changeset',
    templateUrl: 'claim-changeset.component.html',
    styleUrls: ['claim-changeset.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ClaimChangesetService],
})
export class ClaimChangesetComponent implements OnChanges {
    @Input()
    createdAt: string;

    @Input()
    changeset: ClaimChangeset;

    changesetInfoType = ChangesetInfoType;

    changesetsFilterForm = this.claimChangesetService.changesetsFilterForm;
    filteredChangesetInfos$ = this.claimChangesetService.filteredChangesetInfos$;

    constructor(private claimChangesetService: ClaimChangesetService) {}

    simpleTrackBy(index: number): number {
        return index;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { changeset } = changes;
        if (changeset.currentValue) {
            this.claimChangesetService.setChangesetInfos(changeset.currentValue);
        }
    }
}
