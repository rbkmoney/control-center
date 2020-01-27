import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Modification, Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { TimelineAction } from './to-timeline-info/model';
import { ConversationService } from './conversation.service';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { ClaimStatus } from '../../../papi/model';

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

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.claimStatus = extractClaimStatus(currentValue.status);
            this.conversationService.enrichWithData(currentValue.changeset);
        }
    }

    updateConversation(action: TimelineAction, modification: Modification) {
        this.conversationService
            .updateConversation(this.claim.party_id, this.claim.id, action, modification)
            .subscribe(_ => this.conversationChangedEvent.emit());
    }
}
