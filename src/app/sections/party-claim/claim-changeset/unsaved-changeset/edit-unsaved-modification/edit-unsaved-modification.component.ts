import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { getUnionKey, getUnionValue } from '../../../../../shared/utils';
import {
    ClaimModification,
    Modification,
    PartyModification,
} from '../../../../../thrift-services/damsel/gen-model/claim_management';

type ModificationType = 'party_modification' | 'claim_modification';

@Component({
    templateUrl: 'edit-unsaved-modification.component.html',
})
export class EditUnsavedModificationComponent {
    mod: PartyModification | ClaimModification = getUnionValue(this.data);
    form: FormGroup = this.fb.group({});
    formsType: ModificationType = getUnionKey<Modification>(this.data);

    constructor(
        private dialogRef: MatDialogRef<EditUnsavedModificationComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: Modification
    ) {}

    save() {
        this.dialogRef.close({
            [this.formsType]: {
                [getUnionKey(this.mod)]: {
                    id: getUnionValue(this.mod).id,
                    modification: {
                        [getUnionKey(getUnionValue(this.mod).modification)]: this.form.value,
                    },
                },
            },
        });
    }
}
