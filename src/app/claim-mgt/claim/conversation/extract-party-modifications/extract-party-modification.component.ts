import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import {
    ExtractForm,
    ExtractPartyModificationsService,
} from './extract-party-modifications.service';

export interface ExtractPartyModificationInterface {
    questionary: Questionary;
}

@Component({
    templateUrl: 'extract-party-modification.component.html',
    styleUrls: ['extract-party-modification.component.scss'],
    providers: [ExtractPartyModificationsService],
})
export class ExtractPartyModificationComponent implements OnInit {
    forms: ExtractForm[];

    constructor(
        private dialogRef: MatDialogRef<ExtractPartyModificationComponent>,
        private fb: FormBuilder,
        private extractPartyModificationsService: ExtractPartyModificationsService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModificationInterface
    ) {}

    ngOnInit(): void {
        this.forms = this.extractPartyModificationsService.init(this.data.questionary.data);
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
