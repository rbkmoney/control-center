import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StatusModule } from '@cc/app/shared/components';
import { ChargebacksTableModule } from '@cc/app/shared/components/chargebacks-table';
import { CreateChargebackDialogModule } from '@cc/app/shared/components/create-chargeback-dialog';
import { DetailsItemModule } from '@cc/components/details-item';
import { HeadlineModule } from '@cc/components/headline';

import { DepositDetailsRoutingModule } from './deposit-details-routing.module';
import { DepositDetailsComponent } from './deposit-details.component';
import { DetailsModule } from './details/details.module';

@NgModule({
    imports: [
        CommonModule,
        HeadlineModule,
        FlexLayoutModule,
        DepositDetailsRoutingModule,
        MatCardModule,
        DetailsItemModule,
        StatusModule,
        MatProgressSpinnerModule,
        ChargebacksTableModule,
        MatButtonModule,
        MatDialogModule,
        CreateChargebackDialogModule,
        DetailsModule,
    ],
    declarations: [DepositDetailsComponent],
})
export class DepositDetailsModule {}
