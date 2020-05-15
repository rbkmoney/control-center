import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ExtractPartyModificationsService } from './extract-party-modifications.service';
import { toTypeContainer, TypeContainer } from './to-type-container';

interface ExtractPartyModificationInterface {
    mods: PartyModification[];
}

@Component({
    templateUrl: 'extract-party-modification.component.html',
    providers: [ExtractPartyModificationsService],
})
export class ExtractPartyModificationComponent {
    types: TypeContainer[] = this.data.mods.map((m) => toTypeContainer(m));
    form = this.extractPartyModificationService.init(this.types);

    constructor(
        private dialogRef: MatDialogRef<ExtractPartyModificationComponent>,
        private extractPartyModificationService: ExtractPartyModificationsService,
        @Inject(MAT_DIALOG_DATA) private data: ExtractPartyModificationInterface
    ) {}

    extract() {
        this.dialogRef.close(
            this.form.controls
                .map((v, i) => (v ? this.types[i].modification : null))
                .filter((m) => !!m)
        );
    }
}
