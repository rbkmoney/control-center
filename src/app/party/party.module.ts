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
import { ShopModule } from './shop/shop.module';
import { PartyDetailsModule } from './party/party-details.module';
import { PartyDetailsComponent } from './party/party-details.component';

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
        ShopModule
    ],
    declarations: [PartyComponent, ShopsTableComponent, PartyDetailsComponent],
    providers: [PartyService]
})
export class PartyModule {}
