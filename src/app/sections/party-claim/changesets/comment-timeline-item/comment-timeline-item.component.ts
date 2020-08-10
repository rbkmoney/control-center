import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChangesetInfo } from '../claim-changeset/changeset-infos';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTimelineItemComponent {
    @Input()
    changesetInfo: ChangesetInfo;
}
