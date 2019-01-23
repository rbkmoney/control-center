import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PartyDetailsRoutingModule } from './party-details-routing.module';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, PartyDetailsRoutingModule]
})
export class PartyDetailsModule {}
