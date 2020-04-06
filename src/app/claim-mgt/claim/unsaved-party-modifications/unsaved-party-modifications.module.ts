import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { SharedModule } from '../../../shared/shared.module';
import { UnsavedPartyModificationsComponent } from './unsaved-party-modifications.component';

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
