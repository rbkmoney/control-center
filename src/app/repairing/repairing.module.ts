import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

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
        MatTabsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    declarations: [RepairingComponent],
    providers: [RepairingService]
})
export class RepairingModule {}
