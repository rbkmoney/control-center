import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PartyComponent } from './party.component';
import { PartyRoutingModule } from './party-routing.module';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { ShopsTableComponent } from './shops-table/shops-table.component';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop/shop-details/shop-details.component';
import { PartyService } from './party.service';
import { ShopBlockingPipe } from './shop/shop-details/shop-blocking.pipe';
import { ShopSuspensionPipe } from './shop/shop-details/shop-suspension.pipe';
import { ProvidersComponent } from './shop/providers/providers.component';
import { ProviderComponent } from './shop/providers/provider/provider.component';
import { TerminalComponent } from './shop/providers/provider/terminal/terminal.component';

@NgModule({
    imports: [
        CommonModule,
        PartyRoutingModule,
        MatCardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatListModule
    ],
    declarations: [
        PartyComponent,
        PartyDetailsComponent,
        ShopsTableComponent,
        ShopComponent,
        ShopDetailsComponent,
        ProvidersComponent,
        ProviderComponent,
        TerminalComponent,
        ShopBlockingPipe,
        ShopSuspensionPipe
    ],
    providers: [
        PartyService
    ]
})
export class PartyModule {}
