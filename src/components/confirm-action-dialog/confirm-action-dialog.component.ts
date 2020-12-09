import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TerminalActionTypes } from '../../app/sections/shop-details/shop-providers/types';
import { TerminalID } from '../../app/thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../app/thrift-services/fistful/gen-model/provider';

@Component({
    selector: 'cc-confirm-action-dialog',
    templateUrl: 'confirm-action-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmActionDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmActionDialogComponent, 'cancel' | 'confirm'>,
        @Inject(MAT_DIALOG_DATA)
        public data: { title?: string }
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    confirm() {
        this.dialogRef.close('confirm');
    }
}
