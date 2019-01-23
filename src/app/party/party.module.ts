import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PartyComponent } from './party.component';
import { PartyService } from './party.service';
import { ShopsTableComponent } from './shops-table/shops-table.component';
import { PartyDetailsModule } from './party-details/party-details.module';
import { ShopDetailsModule } from './shop/shop-details.module';
import { PartyDetailsComponent } from './party-details/party-details.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        PartyDetailsModule,
        ShopDetailsModule
    ],
    declarations: [PartyComponent, ShopsTableComponent, PartyDetailsComponent],
    providers: [PartyService]
})
export class PartyModule {}
