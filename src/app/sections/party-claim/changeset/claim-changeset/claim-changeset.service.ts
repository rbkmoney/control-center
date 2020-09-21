import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { PartyModificationsExtractorService } from '../../../../party-modifications-extractor';
import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo } from '../changeset-infos';
import { MenuConfigAction, MenuConfigItem } from '../timeline-items/menu-config';
import { UnsavedClaimChangesetService } from '../unsaved-changeset/unsaved-claim-changeset.service';
import { createDeleteCommentModification } from './create-delete-comment-modification';
import { createDeleteFileModification } from './create-delete-file-modification';

@Injectable()
export class ClaimChangesetService {
    constructor(
        private unsavedClaimChangesetService: UnsavedClaimChangesetService,
        private partyModificationsExtractorService: PartyModificationsExtractorService
    ) {
        this.partyModificationsExtractorService.modsExtracted$
            .pipe(
                map((mods) =>
                    mods.map((party_modifications) => ({ party_modifications } as Modification))
                )
            )
            .subscribe((mods) => {
                mods.forEach((mod) => this.unsavedClaimChangesetService.addModification(mod));
            });
    }

    menuItemSelected(
        $event: MenuConfigItem,
        changesetInfos: ChangesetInfo[],
        index: number,
        partyID: PartyID
    ) {
        const changesetInfo = changesetInfos[index];
        switch ($event.action) {
            case MenuConfigAction.deleteComment:
                this.unsavedClaimChangesetService.addModification(
                    createDeleteCommentModification(changesetInfo)
                );
                break;
            case MenuConfigAction.deleteFile:
                this.unsavedClaimChangesetService.addModification(
                    createDeleteFileModification(changesetInfo)
                );
                break;
            case MenuConfigAction.extractPartyModifications:
                this.extractPartyModifications($event.data, partyID);
                break;
            default:
                console.warn('Unsupported method', $event);
        }
    }

    extractPartyModifications(questionary: Questionary, partyID: PartyID) {
        this.partyModificationsExtractorService.init();
        this.partyModificationsExtractorService.extractMods(partyID, questionary);
    }
}
