import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { StatusModule } from '@cc/components/status';
import { PipesModule } from '@cc/pipes/pipes.module';

import { SharedModule } from '../../../shared/shared.module';
import { PaymentsTableComponent } from './payments-table.component';

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
        PipesModule,
    ],
    declarations: [PaymentsTableComponent],
    exports: [PaymentsTableComponent],
})
export class PaymentsTableModule {}
