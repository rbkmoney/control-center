import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule
} from '@angular/material';

import { RepairingComponent } from './repairing.component';
import { RepairingService } from './repairing.service';
import { RepairingRoutingModule } from './repairing-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RepairingRoutingModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
        MatProgressBarModule,
        MatTabsModule
    ],
    declarations: [RepairingComponent],
    providers: [RepairingService]
})
export class RepairingModule {}
