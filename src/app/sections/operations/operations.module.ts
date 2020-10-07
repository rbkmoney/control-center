import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';

@NgModule({
    imports: [OperationsRoutingModule, FlexModule, MatTabsModule, CommonModule],
    declarations: [OperationsComponent],
})
export class OperationsModule {}
