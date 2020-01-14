import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Claim, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { toTimelineInfo } from './to-timeline-info';
import { TimelineAction, TimelineItemInfo } from './to-timeline-info/model';
import { getUnionKey } from '../../../shared/get-union-key';
import { ConversationService } from './conversation.service';

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html',
    providers: [ConversationService]
})
export class ConversationComponent implements OnChanges {
    @Input() claim: Claim;
    @Output() conversationChangedEvent = new EventEmitter();

    timelineInfo: TimelineItemInfo[] = [];

    timelineAction = TimelineAction;

    constructor(private conversationService: ConversationService) {}

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.timelineInfo = toTimelineInfo(currentValue.changeset);
        }
    }

    getKey(u: any): string {
        return getUnionKey(u);
    }

    updateConversation(action: TimelineAction, modification: Modification) {
        this.conversationService
            .updateConversation(this.claim.party_id, this.claim.id, action, modification)
            .subscribe(_ => this.conversationChangedEvent.emit());
    }
}
