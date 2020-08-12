import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ChangesetInfo } from '../claim-changeset/changeset-infos';
import { CommentTimelineItemService } from './comment-timeline-item.service';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommentTimelineItemService],
})
export class CommentTimelineItemComponent implements OnInit {
    @Input()
    changesetInfo: ChangesetInfo;

    isLoading$ = this.commentTimelineItemService.isLoading$;
    message$ = this.commentTimelineItemService.message$;
    error$ = this.commentTimelineItemService.error$;

    constructor(private commentTimelineItemService: CommentTimelineItemService) {}

    ngOnInit(): void {
        this.commentTimelineItemService.getMessage([
            this.changesetInfo.modification.claim_modification.comment_modification.id,
        ]);
    }
}
