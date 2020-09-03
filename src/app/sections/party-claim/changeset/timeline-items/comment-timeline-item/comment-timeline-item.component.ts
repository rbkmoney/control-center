import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { TimelimeItemComponent } from '../timelime-item.component';
import { CommentTimelineItemService } from './comment-timeline-item.service';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommentTimelineItemService],
})
export class CommentTimelineItemComponent extends TimelimeItemComponent implements OnInit {
    @Input()
    changesetInfo: ChangesetInfo;

    isLoading$ = this.commentTimelineItemService.isLoading$;
    message$ = this.commentTimelineItemService.message$;
    error$ = this.commentTimelineItemService.error$;

    constructor(private commentTimelineItemService: CommentTimelineItemService) {
        super();
    }

    ngOnInit(): void {
        this.commentTimelineItemService.getMessage([
            this.changesetInfo.modification.claim_modification.comment_modification.id,
        ]);
    }
}
