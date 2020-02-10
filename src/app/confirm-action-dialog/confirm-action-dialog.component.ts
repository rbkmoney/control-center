import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'cc-confirm-action-dialog',
    templateUrl: 'confirm-action-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmActionDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmActionDialogComponent, 'cancel' | 'confirm'>
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    confirm() {
        this.dialogRef.close('confirm');
    }
}
