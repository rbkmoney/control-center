import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { StatusModule } from '@cc/app/shared/components';
import { CommonPipesModule, ThriftPipesModule } from '@cc/app/shared/pipes';
import { DetailsItemModule } from '@cc/components/details-item';

import { ContractorDetailsModule } from './contractor-details';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentToolModule } from './payment-tool';
import { ProviderNamePipe } from './provider-name.pipe';
import { TerminalNamePipe } from './terminal-name.pipe';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        DetailsItemModule,
        StatusModule,
        PaymentToolModule,
        ThriftPipesModule,
        CommonPipesModule,
        MatDividerModule,
        ContractorDetailsModule,
    ],
    declarations: [PaymentMainInfoComponent, TerminalNamePipe, ProviderNamePipe],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
