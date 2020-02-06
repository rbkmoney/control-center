import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

import { Modification, Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ConversationService } from './conversation.service';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { ClaimStatus } from '../../../papi/model';
import { TimelineAction } from './to-timeline-info/model';
import { QuestionaryService } from './questionary.service';
import { getUnionKey } from '../../../shared/utils';
import { UnitActionsNavListComponent } from '../../../party-modification-creator';
import { SavePartyModificationsService } from './save-party-modifications.service';
import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html',
    providers: [ConversationService, QuestionaryService, SavePartyModificationsService]
})
export class ConversationComponent implements OnChanges {
    @Input() claim: Claim;
    @Output() conversationChangedEvent = new EventEmitter();

    timelineInfo$ = this.conversationService.timelineInfos$;
    questionary$ = this.questionaryService.questionary$;
    timelineAction = TimelineAction;
    claimStatus: ClaimStatus;
    claimStatuses = ClaimStatus;

    unsavedModifications$ = this.savePartyModService.unsavedModifications$;
    hasUnsavedModifications$ = this.savePartyModService.hasUnsavedModifications$;
    isSaving$ = this.savePartyModService.isSaving$;

    constructor(
        private conversationService: ConversationService,
        private questionaryService: QuestionaryService,
        private bottomSheet: MatBottomSheet,
        private savePartyModService: SavePartyModificationsService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.claimStatus = extractClaimStatus(currentValue.status);
            this.conversationService.enrichWithData(currentValue.changeset);
        }
    }

    partyModificationsChanged(m: PartyModification[]) {
        this.savePartyModService.partyModificationsChanged(m);
    }

    saveModifications() {
        this.savePartyModService.save();
    }

    updateConversation(action: TimelineAction, modifications: Modification[]) {
        this.conversationService
            .updateConversation(this.claim.party_id, this.claim.id, action, modifications)
            .subscribe(_ => this.conversationChangedEvent.emit());
    }

    getKey(modification: Modification) {
        return getUnionKey(modification);
    }

    addPartyModification() {
        this.bottomSheet.open(UnitActionsNavListComponent, {
            data: {
                type: 'allActions',
                partyID: this.claim.party_id
            }
        });
    }
}
