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
import { StatusModule } from '@cc/components/status';

import { SharedPipesModule } from '../../../shared';
import { ChargebacksTableComponent } from './chargebacks-table.component';
import { FetchChargebacksService } from './fetch-chargebacks.service';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        FlexModule,
        StatusModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        EmptySearchResultModule,
        SharedPipesModule,
        MatSnackBarModule,
    ],
    declarations: [ChargebacksTableComponent],
    exports: [ChargebacksTableComponent],
    providers: [FetchChargebacksService],
})
export class ChargebacksTableModule {}
