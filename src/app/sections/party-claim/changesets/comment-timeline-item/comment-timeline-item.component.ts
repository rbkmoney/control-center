import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChangesetInfo } from '../claim-changeset/changeset-infos';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTimelineItemComponent implements OnChanges {
    @Input()
    changesetInfo: ChangesetInfo;

    isCreation: boolean;

    ngOnChanges(changes: SimpleChanges): void {
        const { changesetInfo } = changes;
        if (changesetInfo.currentValue) {
            this.isCreation = !!changesetInfo.currentValue.modification.claim_modification
                .comment_modification.modification.creation;
        }
    }
}
