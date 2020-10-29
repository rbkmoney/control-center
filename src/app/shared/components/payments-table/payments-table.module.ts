import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { CommonPipesModule } from '@cc/app/shared/pipes/common-pipes.module';
import { StatusModule } from '@cc/components/status';

import { SharedPipesModule } from '../../pipes';
import { PaymentActionsPipe } from './payment-actions.pipe';
import { PaymentsTableComponent } from './payments-table.component';

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
    declarations: [PaymentsTableComponent, PaymentActionsPipe],
    exports: [PaymentsTableComponent],
})
export class PaymentsTableModule {}
