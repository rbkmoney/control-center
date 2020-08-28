import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { getUnionKey, getUnionValue } from '../../../../../shared/utils';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';

type ModificationType = 'contractor_modification' | 'contract_modification' | 'shop_modification';

@Component({
    templateUrl: 'edit-unsaved-modification.component.html',
})
export class EditUnsavedModificationComponent {
    mod = this.data;
    form: FormGroup = this.fb.group({});
    modType: ModificationType = getUnionKey<PartyModification>(this.data);

    constructor(
        private dialogRef: MatDialogRef<EditUnsavedModificationComponent>,
        private fb: FormBuilder,
        private snackbar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: PartyModification
    ) {}

    save() {
        const modificationUnit = getUnionValue(this.mod);
        this.dialogRef.close({
            party_modification: {
                [getUnionKey(this.mod)]: {
                    id: modificationUnit.id,
                    modification: {
                        [getUnionKey(modificationUnit.modification)]: this.form.value,
                    },
                },
            },
        });
    }
}
