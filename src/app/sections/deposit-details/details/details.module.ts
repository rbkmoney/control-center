import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DetailsItemModule } from '@cc/components/details-item';
import { FlexModule } from '@angular/flex-layout';
import { StatusModule } from '@cc/app/shared/components';
import { CommonPipesModule, ThriftPipesModule } from '@cc/app/shared/pipes';
import { DestinationInfoModule } from '@cc/app/shared/components/destination-info';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        DetailsItemModule,
        FlexModule,
        StatusModule,
        ThriftPipesModule,
        CommonPipesModule,
        DestinationInfoModule,
    ],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
})
export class DetailsModule {}
