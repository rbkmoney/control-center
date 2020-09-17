import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Questionary } from '../thrift-services/ank/gen-model/questionary_manager';
import { PartyID } from '../thrift-services/damsel/gen-model/domain';
import { PartyModificationsExtractorService } from './party-modifications-extractor.service';

export interface ExtractPartyModification {
    questionary: Questionary;
    partyID: PartyID;
}

@Component({
    templateUrl: 'party-modifications-extractor.component.html',
    providers: [PartyModificationsExtractorService],
})
export class PartyModificationsExtractorComponent {
    form = this.extractPartyModificationsService.form;
    partyID: string;
    isContractorAvailable: boolean;

    constructor(
        private dialogRef: MatDialogRef<PartyModificationsExtractorComponent>,
        private extractPartyModificationsService: PartyModificationsExtractorService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModification
    ) {
        this.partyID = this.data.partyID;
        this.isContractorAvailable =
            !!this.data.questionary.data.contractor?.legal_entity ||
            !!this.data.questionary.data.contractor?.individual_entity;
    }

    extract() {
        this.dialogRef.close(
            this.extractPartyModificationsService.mapToModifications(this.data.questionary.data)
        );
    }
}
