import { NgModule } from '@angular/core';
import { PartyShopsRoutingModule } from './party-shops-routing.module';
import { PartyShopsComponent } from './party-shops.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [PartyShopsRoutingModule, CommonModule],
    declarations: [PartyShopsComponent]
})
export class PartyShopsModule {}
