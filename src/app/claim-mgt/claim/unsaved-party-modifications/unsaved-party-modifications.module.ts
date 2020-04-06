import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UnsavedPartyModificationsComponent } from './unsaved-party-modifications.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MatExpansionModule,
        SharedModule,
        MatButtonModule,
        FlexLayoutModule,
        MatDialogModule
    ],
    declarations: [UnsavedPartyModificationsComponent],
    exports: [UnsavedPartyModificationsComponent]
})
export class UnsavedPartyModificationsModule {}
