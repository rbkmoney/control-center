import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogConfig,
    MatDialogModule,
    MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material/dialog';

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
