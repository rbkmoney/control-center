import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShopBlockingPipe } from './shop-details/shop-blocking.pipe';
import { ShopSuspensionPipe } from './shop-details/shop-suspension.pipe';
import { ShopComponent } from './shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderComponent } from './providers/provider/provider.component';
import { TerminalComponent } from './providers/provider/terminal/terminal.component';

@NgModule({
    imports: [
        MatExpansionModule,
        MatListModule,
        MatCardModule,
        CommonModule,
        MatProgressSpinnerModule,
        FlexLayoutModule
    ],
    declarations: [
        ShopBlockingPipe,
        ShopSuspensionPipe,
        ShopComponent,
        ShopDetailsComponent,
        ProvidersComponent,
        ProviderComponent,
        TerminalComponent
    ]
})
export class ShopModule {}
