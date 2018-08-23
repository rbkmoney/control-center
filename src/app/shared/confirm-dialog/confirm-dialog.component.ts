import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ConfirmDialogInterface {
    header?: string;
    text?: string;
}

@Component({
    templateUrl: 'confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: ConfirmDialogInterface) {
    }

    submit() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close(false);
    }
}
