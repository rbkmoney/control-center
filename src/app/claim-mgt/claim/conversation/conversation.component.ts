import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { map } from 'rxjs/operators';

import { Modification, Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ConversationService } from './conversation.service';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { ClaimStatus } from '../../../papi/model';
import { TimelineAction } from './to-timeline-info/model';
import { QuestionaryService } from './questionary.service';
import { getUnionKey } from '../../../shared/get-union-key';
import { UnitActionsNavListComponent } from '../../../party-modification-creator';
import { PartyModificationsPreSaver } from '../party-modifications-pre-saver';

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html',
    providers: [ConversationService, QuestionaryService, PartyModificationsPreSaver]
})
export class ConversationComponent implements OnChanges {
    @Input() claim: Claim;
    @Output() conversationChangedEvent = new EventEmitter();

    timelineInfo$ = this.conversationService.timelineInfos$;
    questionary$ = this.questionaryService.questionary$;
    timelineAction = TimelineAction;
    claimStatus: ClaimStatus;
    claimStatuses = ClaimStatus;

    unsavedPartyModifications$ = this.partyModificationsPreSaver.partyModifications$;
    hasUnsavedPartyModifications$ = this.unsavedPartyModifications$.pipe(map(m => m.length > 0));

    constructor(
        private conversationService: ConversationService,
        private questionaryService: QuestionaryService,
        private bottomSheet: MatBottomSheet,
        private partyModificationsPreSaver: PartyModificationsPreSaver
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
