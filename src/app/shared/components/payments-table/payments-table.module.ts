import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { StatusModule } from '../../../../components/status';
import { CommonPipesModule } from '../../../../pipes/common-pipes.module';
import { PaymentsTableComponent } from '../../components';
import { SharedPipesModule } from '../../pipes';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        SharedPipesModule,
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
