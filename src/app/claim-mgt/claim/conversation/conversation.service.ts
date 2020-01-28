import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import flatten from 'lodash-es/flatten';

import { TimelineAction, TimelineItemInfo } from './to-timeline-info/model';
import {
    ClaimChangeset,
    ClaimID,
    Modification
} from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { toTimelineInfo } from './to-timeline-info';
import { MessagesService } from '../../../thrift-services/messages/messages.service';
import { ConversationId } from '../../../thrift-services/messages/gen-model/messages';
import { addCommentsToTimelineInfos } from './to-timeline-info';

@Injectable()
export class ConversationService {
    timelineInfos$ = new Subject<TimelineItemInfo[]>();

    constructor(
        private claimManagementService: ClaimManagementService,
        private messagesService: MessagesService
    ) {}

    updateConversation(
        party_id: string,
        claim_id: ClaimID,
        action: TimelineAction,
        modifications: Modification[]
    ): Observable<void> {
        return this.claimManagementService
            .getClaim(party_id, claim_id)
            .pipe(
                switchMap(claim =>
                    this.claimManagementService.updateClaim(
                        claim.party_id,
                        claim.id,
                        claim.revision,
                        modifications
                    )
                )
            );
    }

    enrichWithData(changeset: ClaimChangeset) {
        from(this.addCommentsToInfo(toTimelineInfo(changeset))).subscribe(infos =>
            this.timelineInfos$.next(infos)
        );
    }

    private addCommentsToInfo(timelineInfos: TimelineItemInfo[]): Observable<TimelineItemInfo[]> {
        const commentAddedIds: ConversationId[] = flatten(
            timelineInfos
                .filter(info => info.action === TimelineAction.commentAdded)
                .map((commentInfo: TimelineItemInfo) =>
                    commentInfo.modifications.map(m => m.claim_modification.comment_modification.id)
                )
        );

        return this.messagesService.getConversations(commentAddedIds, {}).pipe(
            map(conversationsResponse =>
                addCommentsToTimelineInfos(conversationsResponse.conversations, timelineInfos)
            ),
            catchError(e => {
                console.error(e);
                return [timelineInfos];
            })
        );
    }
}
