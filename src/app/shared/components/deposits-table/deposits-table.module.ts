import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { ApiModelPipesModule, CommonPipesModule } from '../../pipes';
import { StatusModule } from '../status';
import { DepositActionsPipe } from './deposit-actions.pipe';
import { DepositsTableComponent } from './deposits-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        FlexModule,
        StatusModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        CommonPipesModule,
        ApiModelPipesModule,
    ],
    declarations: [DepositsTableComponent, DepositActionsPipe],
    exports: [DepositsTableComponent],
})
export class DepositsTableModule {}
