import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';

import { DomainConfigRoutingModule } from './domain-config-routing.module';
import { DomainConfigComponent } from './domain-config.component';

@NgModule({
    imports: [CommonModule, DomainConfigRoutingModule, MatTabsModule, FlexModule],
    declarations: [DomainConfigComponent],
})
export class DomainConfigModule {}
