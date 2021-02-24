import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { DomainConfigRoutingModule } from './domain-config-objects-routing.module';
import { DomainConfigObjectsComponent } from './domain-config-objects.component';

@NgModule({
    imports: [CommonModule, DomainConfigRoutingModule, FlexModule],
    declarations: [DomainConfigObjectsComponent],
})
export class DomainConfigObjectsModule {}
