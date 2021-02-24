import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { CollapseModule } from '@cc/components/collapse';

import { DomainConfigRoutingModule } from './domain-config-objects-routing.module';
import { DomainConfigObjectsComponent } from './domain-config-objects.component';

@NgModule({
    imports: [CommonModule, DomainConfigRoutingModule, FlexModule, CollapseModule],
    declarations: [DomainConfigObjectsComponent],
})
export class DomainConfigObjectsModule {}
