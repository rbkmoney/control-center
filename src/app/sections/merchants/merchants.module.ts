import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PartiesSearchFiltersModule, PartiesTableModule } from '@cc/app/shared/components';
import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { DeanonimusModule } from '../../thrift-services/deanonimus';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantsComponent } from './merchants.component';

@NgModule({
    imports: [
        MerchantsRoutingModule,
        FlexModule,
        MatCardModule,
        PartiesSearchFiltersModule,
        PartiesTableModule,
        CommonModule,
        DeanonimusModule,
        EmptySearchResultModule,
        MatProgressBarModule,
    ],
    declarations: [MerchantsComponent],
})
export class MerchantsModule {}
