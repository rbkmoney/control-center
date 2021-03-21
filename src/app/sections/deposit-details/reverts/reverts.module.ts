import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';

import { RevertsComponent } from './reverts.component';
import { CreateRevertDialogModule } from './create-revert-dialog/create-revert-dialog.module';

@NgModule({
    imports: [CommonModule, FlexModule, MatCardModule, MatButtonModule, CreateRevertDialogModule],
    declarations: [RevertsComponent],
    exports: [RevertsComponent],
})
export class RevertsModule {}
