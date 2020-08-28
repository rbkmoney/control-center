import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { getUnionKey, getUnionValue } from '../../../../shared/utils';
import {
    ClaimModification,
    Modification,
    PartyModification,
} from '../../../../thrift-services/damsel/gen-model/claim_management';

type ModificationType = 'contractor_modification' | 'contract_modification' | 'shop_modification';

@Component({
    templateUrl: 'edit-unsaved-modification.component.html',
})
export class EditUnsavedModificationComponent {
    mod: PartyModification | ClaimModification = getUnionValue(this.data);
    form: FormGroup = this.fb.group({});
    modType: ModificationType = getUnionKey<PartyModification | ClaimModification>(this.mod);

    constructor(
        private dialogRef: MatDialogRef<EditUnsavedModificationComponent>,
        private fb: FormBuilder,
        private snackbar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: Modification
    ) {}

    save() {
        const { id } = getUnionValue(this.mod);
        if (id) {
            this.dialogRef.close({
                [this.modType]: {
                    id,
                    modification: {
                        [getUnionKey(getUnionValue(this.mod).modification)]: this.form.value,
                    },
                },
            });
        } else {
            this.snackbar.open("Can't edit this type of modification", 'OK');
        }
    }
}
