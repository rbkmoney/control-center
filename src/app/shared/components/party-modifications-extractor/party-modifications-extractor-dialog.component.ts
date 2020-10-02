import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Questionary } from '../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { PartyModificationsExtractorDialogService } from './party-modifications-extractor-dialog.service';

export interface ExtractPartyModification {
    questionary: Questionary;
    partyID: PartyID;
}

@Component({
    templateUrl: 'party-modifications-extractor-dialog.component.html',
    providers: [PartyModificationsExtractorDialogService],
})
export class PartyModificationsExtractorDialogComponent {
    form = this.partyModificationsExtractorDialogService.form;
    partyID: string;
    isContractorAvailable: boolean;

    constructor(
        private dialogRef: MatDialogRef<PartyModificationsExtractorDialogComponent>,
        private partyModificationsExtractorDialogService: PartyModificationsExtractorDialogService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModification
    ) {
        this.partyID = this.data.partyID;
        this.isContractorAvailable =
            !!this.data.questionary.data.contractor?.legal_entity ||
            !!this.data.questionary.data.contractor?.individual_entity;
    }

    extract() {
        this.dialogRef.close(
            this.partyModificationsExtractorDialogService.mapToModifications(
                this.data.questionary.data
            )
        );
    }
}
