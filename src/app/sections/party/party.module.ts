import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { PartyMgtRouting } from './party-routing.module';
import { PartyComponent } from './party.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [PartyMgtRouting, CommonModule, MatTabsModule, SharedModule],
    declarations: [PartyComponent]
})
export class PartyModule {}
