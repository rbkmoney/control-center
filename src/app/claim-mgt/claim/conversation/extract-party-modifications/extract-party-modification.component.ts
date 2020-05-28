import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { ExtractPartyModificationsService } from './extract-party-modifications.service';

export interface ExtractPartyModification {
    questionary: Questionary;
}

@Component({
    templateUrl: 'extract-party-modification.component.html',
    providers: [ExtractPartyModificationsService],
})
export class ExtractPartyModificationComponent {
    form = this.extractPartyModificationsService.form;
    category = this.extractPartyModificationsService.category;

    constructor(
        private dialogRef: MatDialogRef<ExtractPartyModificationComponent>,
        private extractPartyModificationsService: ExtractPartyModificationsService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModification
    ) {}

    getModsGroup(): FormGroup {
        return this.form.get('mods') as FormGroup;
    }

    extract() {
        this.dialogRef.close(
            this.extractPartyModificationsService.mapToModifications(this.data.questionary.data)
        );
    }
}
