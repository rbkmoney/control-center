import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { PipesModule } from '@cc/app/shared/pipes/pipes.module';
import { StatusModule } from '@cc/components/status';
import { CommonPipesModule } from '@cc/pipes/common-pipes.module';

import { PaymentsTableComponent } from './payments-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        PipesModule,
        FlexModule,
        StatusModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        CommonPipesModule,
    ],
    declarations: [PaymentsTableComponent],
    exports: [PaymentsTableComponent],
})
export class PaymentsTableModule {}
