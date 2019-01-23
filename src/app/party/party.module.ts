import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PartyService } from './party.service';
import { PartyDetailsModule } from './party-details/party-details.module';
import { ShopModule } from './shop-details/shop.module';
import { PartyRoutingModule } from './party-routing.module';

@NgModule({
    imports: [
        PartyRoutingModule,
        CommonModule,
        FlexLayoutModule,
        PartyDetailsModule,
        ShopModule
    ],
    providers: [PartyService]
})
export class PartyModule {}
