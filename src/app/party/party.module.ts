import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PartyDetailsModule } from './party-details/party-details.module';
import { PartyRoutingModule } from './party-routing.module';
import { PartyService } from './party.service';
import { ShopDetailsModule } from './shop-details/shop-details.module';

@NgModule({
    imports: [
        PartyRoutingModule,
        CommonModule,
        FlexLayoutModule,
        PartyDetailsModule,
        ShopDetailsModule
    ],
    providers: [PartyService]
})
export class PartyModule {}
