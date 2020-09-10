import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo } from '../changeset-infos';
import { MenuConfigAction, MenuConfigItem } from '../timeline-items/menu-config';
import { ExtractPartyModificationComponent } from '../timeline-items/questionary-timeline-item/extract-party-modifications/extract-party-modification.component';
import { UnsavedClaimChangesetService } from '../unsaved-changeset/unsaved-claim-changeset.service';
import { createDeleteCommentModification } from './create-delete-comment-modification';
import { createDeleteFileModification } from './create-delete-file-modification';

@Injectable()
export class ClaimChangesetService {
    constructor(
        private unsavedClaimChangesetService: UnsavedClaimChangesetService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    menuItemSelected($event: MenuConfigItem, changesetInfo: ChangesetInfo, partyID: PartyID) {
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
        const dialog = this.dialog.open(ExtractPartyModificationComponent, {
            disableClose: true,
            data: { questionary, partyID },
            width: '800px',
        });
        dialog
            .afterClosed()
            .pipe(filter((r) => r.length > 0))
            .subscribe((result) => {
                this.snackBar.open('Party modifications extracted successfully', 'OK', {
                    duration: 1500,
                });
                result
                    .map((item) => ({ party_modification: item }))
                    .forEach((item) => this.unsavedClaimChangesetService.addModification(item));
            });
    }
}
