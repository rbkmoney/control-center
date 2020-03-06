import { NgModule } from '@angular/core';
import { PartyMgtRouting } from './party-mgt-routing.module';
import { PartyMgtComponent } from './party-mgt.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatCommonModule } from '@angular/material/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [PartyMgtRouting, CommonModule, MatTabsModule, SharedModule],
    declarations: [PartyMgtComponent]
})
export class PartyMgtModule {}
