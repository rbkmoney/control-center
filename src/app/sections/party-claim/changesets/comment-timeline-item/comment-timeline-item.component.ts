import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';

import { ChangesetInfo } from '../claim-changeset/changeset-infos';
import { CommentTimelineItemService } from './comment-timeline-item.service';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommentTimelineItemService],
})
export class CommentTimelineItemComponent implements OnChanges, OnInit {
    @Input()
    changesetInfo: ChangesetInfo;

    isLoading$ = this.commentTimelineItemService.isLoading$;
    conversations$ = this.commentTimelineItemService.conversations$;
    error$ = this.commentTimelineItemService.error$;

    isCreation: boolean;

    constructor(private commentTimelineItemService: CommentTimelineItemService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { changesetInfo } = changes;
        if (changesetInfo.currentValue) {
            this.isCreation = !!changesetInfo.currentValue.modification.claim_modification
                .comment_modification.modification.creation;
        }
    }

    ngOnInit(): void {
        this.commentTimelineItemService.getConversations([
            this.changesetInfo.modification.claim_modification.comment_modification.id,
        ]);
    }

    toKek(conversation: any) {
        console.log(conversation);
    }
}
