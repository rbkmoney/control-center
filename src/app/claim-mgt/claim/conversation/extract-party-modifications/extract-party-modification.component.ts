import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import {
    ExtractForm,
    ExtractPartyModificationsService,
} from './extract-party-modifications.service';

export interface ExtractPartyModification {
    questionary: Questionary;
}

@Component({
    templateUrl: 'extract-party-modification.component.html',
    styleUrls: ['extract-party-modification.component.scss'],
    providers: [ExtractPartyModificationsService],
})
export class ExtractPartyModificationComponent implements OnInit {
    forms: ExtractForm[];
    createShop = this.extractPartyModificationsService.createShop;

    constructor(
        private dialogRef: MatDialogRef<ExtractPartyModificationComponent>,
        private extractPartyModificationsService: ExtractPartyModificationsService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModification
    ) {}

    ngOnInit(): void {
        this.forms = this.extractPartyModificationsService.createForms(this.data.questionary.data);
    }

    extract() {
        this.dialogRef.close(
            this.extractPartyModificationsService.mapToModifications(
                this.data.questionary,
                this.forms
            )
        );
    }
}
