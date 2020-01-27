import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Modification, Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ConversationService } from './conversation.service';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { ClaimStatus } from '../../../papi/model';
import { TimelineAction, TimelineItemInfo } from './to-timeline-info/model';

export interface TimelineActionType {
    name: string;
    actions: TimelineAction[];
}

const timelineActionTypes: TimelineActionType[] = [
    { name: 'change', actions: [TimelineAction.changesAdded] },
    { name: 'file attachment', actions: [TimelineAction.filesAdded] },
    { name: 'comment', actions: [TimelineAction.commentAdded] },
    {
        name: 'status change', actions:
            [
                TimelineAction.statusAccepted,
                TimelineAction.statusDenied,
                TimelineAction.statusPending,
                TimelineAction.statusReview,
                TimelineAction.statusRevoked
            ]
    }
];

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html',
    providers: [ConversationService]
})
export class ConversationComponent implements OnChanges {
    @Input() claim: Claim;
    @Output() conversationChangedEvent = new EventEmitter();

    timelineInfo$ = this.conversationService.timelineInfos$;
    timelineAction = TimelineAction;
    claimStatus: ClaimStatus;
    claimStatuses = ClaimStatus;

    constructor(private conversationService: ConversationService) {}

    filteredTimelineInfo: TimelineItemInfo[] = [];

    timelineActionTypes = timelineActionTypes;

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.claimStatus = extractClaimStatus(currentValue.status);
            this.conversationService.enrichWithData(currentValue.changeset);
        }
    }

    selectFilter(value: TimelineActionType[]) {
        const filters = this.getFilterValues(value);
        if (filters.length) {
            this.filteredTimelineInfo = this.timelineInfo.filter(i => filters.includes(i.action))
        } else {
            this.filteredTimelineInfo = this.timelineInfo;
        }
    }

    private getFilterValues(value: TimelineActionType[]): TimelineAction[] {
        return ([] as TimelineAction[]).concat(...value.map(i => i.actions));
    }

    updateConversation(action: TimelineAction, modification: Modification) {
        this.conversationService
            .updateConversation(this.claim.party_id, this.claim.id, action, modification)
            .subscribe(_ => this.conversationChangedEvent.emit());
    }
}
