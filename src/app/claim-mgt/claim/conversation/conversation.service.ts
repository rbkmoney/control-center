import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import flatten from 'lodash-es/flatten';

import { TimelineAction, TimelineItemInfo } from './to-timeline-info/model';
import { ClaimChangeset, ClaimID, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { toTimelineInfo } from './to-timeline-info';
import { MessagesService } from '../../../thrift-services/messages/messages.service';
import { ConversationId, GetConversationResponse } from '../../../thrift-services/messages/gen-model/messages';
import { addCommentsToTimelineInfos } from './to-timeline-info';

@Injectable()
export class ConversationService {
    timelineInfos$ = new Subject<TimelineItemInfo[]>();

    constructor(
        private claimManagementService: ClaimManagementService,
        private messagesService: MessagesService
    ) {
    }

    updateConversation(
        party_id: string,
        claim_id: ClaimID,
        action: TimelineAction,
        modification: Modification
    ): Observable<void> {
        return this.claimManagementService
            .getClaim(party_id, claim_id)
            .pipe(
                switchMap(claim =>
                    this.claimManagementService.updateClaim(
                        claim.party_id,
                        claim.id,
                        claim.revision,
                        [modification]
                    )
                )
            );
    }

    async enrichWithData(changeset: ClaimChangeset) {
        let timelineInfos = toTimelineInfo(changeset);
        timelineInfos = await this.addCommentsToInfo(timelineInfos);
        this.timelineInfos$.next(timelineInfos);
    }

    private async addCommentsToInfo(
        timelineInfos: TimelineItemInfo[]
    ): Promise<TimelineItemInfo[]> {
        const commentAddedIds: ConversationId[] = flatten(
            timelineInfos.filter(info => info.action === TimelineAction.commentAdded).map((commentInfo: TimelineItemInfo) =>
                commentInfo.modifications.map(m => m.claim_modification.comment_modification.id)
            )
        );
        const conversationsResponse = (await this.messagesService
            .getConversations(commentAddedIds, {})
            .toPromise()
            .catch(e => console.error(e))) as GetConversationResponse;
        return conversationsResponse
            ? (addCommentsToTimelineInfos(
                conversationsResponse.conversations,
                timelineInfos
            ) as TimelineItemInfo[])
            : timelineInfos;
    }
}
