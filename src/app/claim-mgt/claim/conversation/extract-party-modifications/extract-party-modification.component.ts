import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { ExtractPartyModificationsService } from './extract-party-modifications.service';

export interface ExtractPartyModification {
    questionary: Questionary;
}

@Component({
    templateUrl: 'extract-party-modification.component.html',
    styleUrls: ['extract-party-modification.component.scss'],
    providers: [ExtractPartyModificationsService],
})
export class ExtractPartyModificationComponent implements OnInit {
    form = this.extractPartyModificationsService.form;

    constructor(
        private dialogRef: MatDialogRef<ExtractPartyModificationComponent>,
        private extractPartyModificationsService: ExtractPartyModificationsService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModification
    ) {}

    getQuestionaryGroup(): FormGroup {
        return this.form.get('questionary') as FormGroup;
    }

    ngOnInit(): void {
        this.extractPartyModificationsService.createForms(this.data.questionary.data);
    }

    extract() {
        this.dialogRef.close(
            this.extractPartyModificationsService.mapToModifications(this.data.questionary.data)
        );
    }
}
