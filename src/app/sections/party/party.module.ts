import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { DeanonimusModule } from '../../thrift-services/deanonimus';
import { PartyRouting } from './party-routing.module';
import { PartyComponent } from './party.component';

@NgModule({
    imports: [
        PartyRouting,
        CommonModule,
        MatTabsModule,
        FlexModule,
        MatButtonModule,
        DeanonimusModule,
    ],
    declarations: [PartyComponent],
})
export class PartyModule {}
