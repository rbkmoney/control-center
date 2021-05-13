import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { CreateRevertDialogModule } from './create-revert-dialog/create-revert-dialog.module';
import { RevertsTableModule } from './reverts-table';
import { RevertsComponent } from './reverts.component';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        MatCardModule,
        MatButtonModule,
        CreateRevertDialogModule,
        RevertsTableModule,
        MatProgressSpinnerModule,
        EmptySearchResultModule,
    ],
    declarations: [RevertsComponent],
    exports: [RevertsComponent],
})
export class RevertsModule {}
