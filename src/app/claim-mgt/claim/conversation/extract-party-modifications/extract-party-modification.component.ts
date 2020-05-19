import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { atLeastOneSelectedValidator } from './atleast-one-selected-validator';

interface ExtractPartyModificationInterface {
    mods: PartyModification[];
}

@Component({
    templateUrl: 'extract-party-modification.component.html',
    styleUrls: ['extract-party-modification.component.scss'],
})
export class ExtractPartyModificationComponent {
    mods = this.data.mods;
    form = this.fb.array(
        this.data.mods.map(() => false),
        { validators: atLeastOneSelectedValidator }
    );

    constructor(
        private dialogRef: MatDialogRef<ExtractPartyModificationComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModificationInterface
    ) {}

    extract() {
        this.dialogRef.close(
            this.form.controls
                .map((v, i) => (v.value ? this.data.mods[i] : null))
                .filter((m) => !!m)
        );
    }
}
