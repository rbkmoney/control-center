import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { StatusModule } from '../../shared/components/status';
import { SharedModule } from '../../shared/shared.module';
import { ChargebacksTableComponent } from './chargebacks-table.component';
import { FetchChargebacksService } from './fetch-chargebacks.service';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule,
        FlexModule,
        StatusModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
    ],
    declarations: [ChargebacksTableComponent],
    exports: [ChargebacksTableComponent],
    providers: [FetchChargebacksService],
})
export class ChargebacksTableModule {}
