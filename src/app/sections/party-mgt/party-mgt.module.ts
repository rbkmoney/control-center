import { NgModule } from '@angular/core';
import { PartyMgtRouting } from './party-mgt-routing.module';
import { PartyMgtComponent } from './party-mgt.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [PartyMgtRouting, CommonModule, MatTabsModule],
    declarations: [PartyMgtComponent]
})
export class PartyMgtModule {}
