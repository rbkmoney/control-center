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
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { SimpleRepairComponent } from './simple-repair/simpel-repair.component';
import { RepairingComponent } from './repairing.component';
import { RepairingService } from './repairing.service';
import { RepairingRoutingModule } from './repairing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MachinegunModule } from '../machinegun/machinegun.module';
import { RepairWithScenarioComponent } from './repair-with-scenario/repair-wirh-scenario.component';
import { DialogComponent as RepairWithScenarioDialogComponent } from './repair-with-scenario/dialog/dialog.component';
import { FistfulModule } from '../fistful/fistful.model';
import { RepairComponent } from './repair/repair.component';
import { DialogComponent as RepairDialogComponent } from './repair/dialog/dialog.component';

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
        MatSelectModule,
        MatAutocompleteModule,
        MatTooltipModule,
        FistfulModule,
        MatDialogModule,
        MatCheckboxModule
    ],
    declarations: [
        RepairingComponent,
        SimpleRepairComponent,
        RepairWithScenarioComponent,
        RepairComponent,
        RepairWithScenarioDialogComponent,
        RepairDialogComponent
    ],
    entryComponents: [RepairWithScenarioDialogComponent, RepairDialogComponent],
    providers: [RepairingService]
})
export class RepairingModule {}
