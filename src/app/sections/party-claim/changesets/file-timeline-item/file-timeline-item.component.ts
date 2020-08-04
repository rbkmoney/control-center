import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChangesetInfo } from '../claim-changeset/changeset-infos';

@Component({
    selector: 'cc-file-timeline-item',
    templateUrl: 'file-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTimelineItemComponent implements OnChanges {
    @Input()
    changesetInfo: ChangesetInfo;

    isCreation: boolean;

    ngOnChanges(changes: SimpleChanges): void {
        const { changesetInfo } = changes;
        if (changesetInfo.currentValue) {
            this.isCreation = !!changesetInfo.currentValue.modification.claim_modification
                .file_modification.modification.creation;
        }
    }
}
