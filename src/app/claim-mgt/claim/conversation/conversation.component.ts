import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { combineLatest, from, of } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

import { AppAuthGuardService } from '../../../app-auth-guard.service';
import { ClaimStatus } from '../../../papi/model';
import {
    PartyModificationEmitter,
    UnitActionsNavListComponent,
} from '../../../party-modification-creator';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { getUnionKey } from '../../../shared/utils';
import { Questionary } from '../../../thrift-services/ank/gen-model/questionary_manager';
import { Claim, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';
import { RecreateClaimService } from '../recreate-claim';
import { ConversationService } from './conversation.service';
import { ExtractPartyModificationComponent } from './extract-party-modifications/extract-party-modification.component';
import { QuestionaryService } from './questionary.service';
import { SavePartyModificationsService } from './save-party-modifications.service';
import { TimelineAction } from './to-timeline-info/model';

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html',
    providers: [ConversationService, QuestionaryService, SavePartyModificationsService],
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

    canAddClaimMod = this.appAuthGuardService.userHasRoles(['add_claim_mod']);
    canAddPartyMod = this.appAuthGuardService.userHasRoles(['add_party_mod']);

    constructor(
        private router: Router,
        private conversationService: ConversationService,
        private questionaryService: QuestionaryService,
        private bottomSheet: MatBottomSheet,
        private savePartyModService: SavePartyModificationsService,
        private recreateClaimService: RecreateClaimService,
        private partyModEmitter: PartyModificationEmitter,
        private snackBar: MatSnackBar,
        private appAuthGuardService: AppAuthGuardService,
        private dialog: MatDialog
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.claimStatus = extractClaimStatus(currentValue.status);
            this.conversationService.enrichWithData(currentValue.changeset);
        }
    }

    ngOnInit() {
        console.log(this.claim)
        this.recreateClaimService.recreated$
            .pipe(
                switchMap(({ party_id, id }) =>
                    from(
                        this.router.navigate([
                            'claim-mgt',
                            'party',
                            party_id,
                            'claim',
                            id.toString(),
                        ])
                    )
                )
            )
            .subscribe(() =>
                this.snackBar.open('Claim recreated successfully', 'OK', { duration: 2000 })
            );
        this.recreateClaimService.extractedModifications$
            .pipe(map((mods) => mods.map((modification) => modification.party_modification)))
            .subscribe((m) => this.savePartyModService.partyModificationsChanged(m));
        this.partyModEmitter.modification$
            .pipe(
                switchMap((m) => combineLatest([of(m), this.unsavedModifications$.pipe(first())])),
                map(([m, unsavedMods]) => [...unsavedMods, m])
            )
            .subscribe((m) => this.savePartyModService.partyModificationsChanged(m));
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
            .subscribe(() => this.conversationChangedEvent.emit());
    }

    getKey(modification: Modification) {
        return getUnionKey(modification);
    }

    addPartyModification() {
        this.bottomSheet.open(UnitActionsNavListComponent, {
            data: {
                type: 'allActions',
                partyID: this.claim.party_id,
            },
        });
    }

    extractPartyModification(questionary: Questionary) {
        const dialog = this.dialog.open(ExtractPartyModificationComponent, {
            disableClose: true,
            data: { questionary },
        });
        dialog
            .afterClosed()
            .pipe(filter((r) => r.length > 0))
            .subscribe((result) => {
                this.snackBar.open('Party modifications extracted successfully', 'OK', {
                    duration: 1500,
                });
                this.partyModificationsChanged(result);
            });
    }

    canUseActionsForQuestionary(modifications: Modification[]) {
        return (
            modifications.filter((m) => !!m?.claim_modification?.document_modification).length > 0
        );
    }
}
