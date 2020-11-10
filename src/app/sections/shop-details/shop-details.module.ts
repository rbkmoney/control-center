import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HeadlineModule } from '@cc/components/headline';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopMainInfoModule } from './shop-main-info';

@NgModule({
    imports: [
        ShopDetailsRoutingModule,
        ShopMainInfoModule,
        HeadlineModule,
        FlexModule,
        MatCardModule,
        CommonModule,
        MatProgressSpinnerModule,
    ],
    declarations: [ShopDetailsComponent],
})
export class ShopDetailsModule {}
