import { NgModule } from '@angular/core';
import {
    MatDialogModule,
    MatButtonModule,
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatDialogConfig
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfirmActionDialogComponent } from './confirm-action-dialog.component';

@NgModule({
    imports: [MatDialogModule, MatButtonModule, FlexLayoutModule],
    declarations: [ConfirmActionDialogComponent],
    exports: [ConfirmActionDialogComponent],
    entryComponents: [ConfirmActionDialogComponent],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                width: '450px',
                hasBackdrop: true,
                disableClose: true
            } as MatDialogConfig
        }
    ]
})
export class ConfirmActionDialogModule {}
