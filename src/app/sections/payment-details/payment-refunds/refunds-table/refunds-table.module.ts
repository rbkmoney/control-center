import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { StatusModule } from '@cc/app/shared/components/status';
import { CommonPipesModule, ThriftPipesModule } from '@cc/app/shared/pipes';

import { RefundsTableComponent } from './refunds-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        FlexModule,
        MatButtonModule,
        StatusModule,
        ThriftPipesModule,
        CommonPipesModule,
    ],
    declarations: [RefundsTableComponent],
    exports: [RefundsTableComponent],
})
export class RefundsTableModule {}
