import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { SimpleRepairComponent } from './simple-repair/simpel-repair.component';
import { RepairingComponent } from './repairing.component';
import { RepairingService } from './repairing.service';
import { RepairingRoutingModule } from './repairing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MachinegunModule } from '../machinegun/machinegun.module';

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
        ReactiveFormsModule,
        MatIconModule,
        MachinegunModule,
        MatChipsModule,
        MatSnackBarModule,
        MatSelectModule
    ],
    declarations: [RepairingComponent, SimpleRepairComponent],
    providers: [RepairingService]
})
export class RepairingModule {}
