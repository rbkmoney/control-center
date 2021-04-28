import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { StatusModule } from '@cc/app/shared/components';
import { WalletInfoModule } from '@cc/app/shared/components/wallet-info';
import { CommonPipesModule, ThriftPipesModule } from '@cc/app/shared/pipes';
import { DetailsItemModule } from '@cc/components/details-item';

import { DepositMainInfoComponent } from './deposit-main-info.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        DetailsItemModule,
        FlexModule,
        StatusModule,
        ThriftPipesModule,
        CommonPipesModule,
        WalletInfoModule,
    ],
    declarations: [DepositMainInfoComponent],
    exports: [DepositMainInfoComponent],
})
export class DepositMainInfoModule {}
