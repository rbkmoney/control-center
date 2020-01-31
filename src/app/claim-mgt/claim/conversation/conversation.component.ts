import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Modification, Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ConversationService } from './conversation.service';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { ClaimStatus } from '../../../papi/model';
import { TimelineAction } from './to-timeline-info/model';
import { getUnionKey } from '../../../shared/get-union-key';
import { QuestionaryService } from './questionary.service';

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html',
    providers: [ConversationService, QuestionaryService]
})
export class ConversationComponent implements OnChanges {
    @Input() claim: Claim;
    @Output() conversationChangedEvent = new EventEmitter();

    timelineInfo$ = this.conversationService.timelineInfos$;
    questionary$ = this.questionaryService.questionary$;
    timelineAction = TimelineAction;
    claimStatus: ClaimStatus;
    claimStatuses = ClaimStatus;

    constructor(
        private conversationService: ConversationService,
        private questionaryService: QuestionaryService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.claimStatus = extractClaimStatus(currentValue.status);
            this.conversationService.enrichWithData(currentValue.changeset);
        }
    }

    updateConversation(action: TimelineAction, modifications: Modification[]) {
        this.conversationService
            .updateConversation(this.claim.party_id, this.claim.id, action, modifications)
            .subscribe(_ => this.conversationChangedEvent.emit());
    }

    getKey(m: Modification) {
        return getUnionKey(m);
    }
}
