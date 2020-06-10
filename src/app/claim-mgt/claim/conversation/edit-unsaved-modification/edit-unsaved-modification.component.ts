import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { getUnionKey } from '../../../../shared/utils';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';

type ModificationType = 'contractor_modification' | 'contract_modification' | 'shop_modification';

@Component({
    templateUrl: 'edit-unsaved-modification.component.html',
})
export class EditUnsavedModificationComponent {
    mod: PartyModification = this.data;
    form: FormGroup = this.fb.group({});
    modType: ModificationType = getUnionKey<PartyModification>(this.mod);

    constructor(
        private dialogRef: MatDialogRef<EditUnsavedModificationComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: PartyModification
    ) {}

    save() {
        this.dialogRef.close({
            [this.modType]: {
                id: this.mod[this.modType].id,
                modification: {
                    [getUnionKey(this.mod[this.modType].modification)]: this.form.value,
                },
            },
        });
    }
}
