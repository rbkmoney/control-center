import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProviderComponent } from './provider/provider.component';
import { TerminalComponent } from './provider/terminal/terminal.component';
import { ShopBlockingPipe } from './shop-info/shop-blocking.pipe';
import { ShopSuspensionPipe } from './shop-info/shop-suspension.pipe';
import { ShopInfo } from './shop-info/shop-info.component';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopDetailsService } from './shop-details.service';

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
        ShopDetailsComponent,
        ShopBlockingPipe,
        ShopSuspensionPipe,
        ShopInfo,
        ProviderComponent,
        TerminalComponent
    ],
    providers: [ShopDetailsService]
})
export class ShopDetailsModule {}
