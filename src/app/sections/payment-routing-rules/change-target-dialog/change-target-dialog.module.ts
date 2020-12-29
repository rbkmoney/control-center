import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ErrorModule } from '../../../shared/services/error';
import { TargetRulesetFormModule } from '../target-ruleset-form';
import { ChangeTargetDialogComponent } from './change-target-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ErrorModule,
        TargetRulesetFormModule,
        FlexLayoutModule,
        MatDialogModule,
        MatButtonModule,
    ],
    declarations: [ChangeTargetDialogComponent],
    exports: [ChangeTargetDialogComponent],
})
export class ChangeTargetDialogModule {}
