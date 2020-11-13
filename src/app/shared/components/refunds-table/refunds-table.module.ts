import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { CommonPipesModule, ThriftPipesModule } from '../../pipes';
import { StatusModule } from '../status';
import { FetchRefundsService } from './fetch-refunds.service';
import { RefundsTableComponent } from './refunds-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        FlexModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        EmptySearchResultModule,
        MatSnackBarModule,
        StatusModule,
        ThriftPipesModule,
        CommonPipesModule,
    ],
    declarations: [RefundsTableComponent],
    providers: [FetchRefundsService],
    exports: [RefundsTableComponent],
})
export class RefundsTableModule {}
