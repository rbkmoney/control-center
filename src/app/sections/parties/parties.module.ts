import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { PartiesSearchFiltersModule, PartiesTableModule } from '@cc/app/shared/components';

import { DeanonimusModule } from '../../thrift-services/deanonimus';
import { PartiesRoutingModule } from './parties-routing.module';
import { PartiesComponent } from './parties.component';

@NgModule({
    imports: [
        PartiesRoutingModule,
        FlexModule,
        MatCardModule,
        PartiesSearchFiltersModule,
        PartiesTableModule,
        CommonModule,
        DeanonimusModule,
    ],
    declarations: [PartiesComponent],
})
export class PartiesModule {}
