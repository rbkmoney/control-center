import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UnsavedPartyModificationsComponent } from './unsaved-party-modifications.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MatExpansionModule,
        SharedModule,
        MatDividerModule,
        MatButtonModule,
        FlexLayoutModule,
        MatDialogModule
    ],
    declarations: [UnsavedPartyModificationsComponent],
    exports: [UnsavedPartyModificationsComponent]
})
export class UnsavedPartyModificationsModule {}
