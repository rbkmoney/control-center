import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    OnInit
} from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';

import { Modification, Claim } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ConversationService } from './conversation.service';
import { extractClaimStatus } from '../../../../shared/extract-claim-status';
import { ClaimStatus } from '../../../../papi/model';
import { TimelineAction } from './to-timeline-info/model';
import { QuestionaryService } from './questionary.service';
import { getUnionKey } from '../../../../shared/utils';
import {
    UnitActionsNavListComponent,
    PartyModificationEmitter
} from '../../../../party-modification-creator';
import { SavePartyModificationsService } from './save-party-modifications.service';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/payment_processing';
import { RecreateClaimService } from '../recreate-claim';

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html',
    providers: [ConversationService, QuestionaryService, SavePartyModificationsService]
})
export class ConversationComponent implements OnChanges, OnInit {
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
        private router: Router,
        private conversationService: ConversationService,
        private questionaryService: QuestionaryService,
        private bottomSheet: MatBottomSheet,
        private savePartyModService: SavePartyModificationsService,
        private recreateClaimService: RecreateClaimService,
        private partyModEmitter: PartyModificationEmitter,
        private snackBar: MatSnackBar
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.claimStatus = extractClaimStatus(currentValue.status);
            this.conversationService.enrichWithData(currentValue.changeset);
        }
    }

    ngOnInit() {
        this.recreateClaimService.recreated$
            .pipe(
                switchMap(({ party_id, id }) =>
                    from(
                        this.router.navigate([
                            'claim-mgt',
                            'party',
                            party_id,
                            'claim',
                            id.toString()
                        ])
                    )
                )
            )
            .subscribe(() =>
                this.snackBar.open('Claim recreated successfully', 'OK', { duration: 2000 })
            );
        this.recreateClaimService.extractedModifications$
            .pipe(map(mods => mods.map(modification => modification.party_modification)))
            .subscribe(m => this.savePartyModService.partyModificationsChanged(m));
        this.partyModEmitter.modification$
            .pipe(scan((acc, curr) => [...acc, curr], []))
            .subscribe(m => this.savePartyModService.partyModificationsChanged(m));
        this.recreateClaimService.extractError$.subscribe(() =>
            this.snackBar.open('An error occurred while claim recreated', 'OK')
        );
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
