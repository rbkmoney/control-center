import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PartyShopsRoutingModule } from './party-shops-routing.module';
import { PartyShopsComponent } from './party-shops.component';

@NgModule({
    imports: [PartyShopsRoutingModule, CommonModule],
    declarations: [PartyShopsComponent],
})
export class PartyShopsModule {}
