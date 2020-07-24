import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ExtractPartyModificationsService } from './extract-party-modifications.service';

export interface ExtractPartyModification {
    questionary: Questionary;
    partyID: PartyID;
}

@Component({
    templateUrl: 'extract-party-modification.component.html',
    providers: [ExtractPartyModificationsService],
    styleUrls: ['extract-party-modifications.component.scss']
})
export class ExtractPartyModificationComponent {
    form = this.extractPartyModificationsService.form;

    constructor(
        private dialogRef: MatDialogRef<ExtractPartyModificationComponent>,
        private extractPartyModificationsService: ExtractPartyModificationsService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModification
    ) {}

    extract() {
        this.dialogRef.close(
            this.extractPartyModificationsService.mapToModifications(this.data.questionary.data)
        );
    }
}
