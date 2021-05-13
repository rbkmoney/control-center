import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';

import { StatusModule } from '@cc/app/shared/components';
import { CommonPipesModule, ThriftPipesModule } from '@cc/app/shared/pipes';

import { RevertsTableComponent } from './reverts-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        FlexModule,
        StatusModule,
        CommonPipesModule,
        StatusModule,
        ThriftPipesModule,
    ],
    declarations: [RevertsTableComponent],
    exports: [RevertsTableComponent],
})
export class RevertsTableModule {}
