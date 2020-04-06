import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { SimpleRepairComponent } from './simple-repair/simple-repair.component';
import { RepairingComponent } from './repairing.component';
import { RepairingService } from './repairing.service';
import { RepairingRoutingModule } from './repairing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MachinegunModule } from '../thrift-services/machinegun/machinegun.module';
import { RepairWithScenarioComponent } from './repair-with-scenario/repair-wirh-scenario.component';
import { RepairWithScenarioSettingsComponent } from './repair-with-scenario/repair-with-scenario-settings/repair-with-scenario-settings.component';
import { FistfulModule } from '../thrift-services/fistful/fistful.module';
import { RepairComponent } from './repair/repair.component';
import { RepairSettingsComponent } from './repair/repair-settings/repair-settings.component';
import { AddIdsInputComponent } from './add-ids-input/add-ids-input.component';
import { RepairingStatusComponent } from './repairing-status/repairing-status.component';

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
        RepairWithScenarioSettingsComponent,
        RepairComponent,
        RepairSettingsComponent,
        AddIdsInputComponent,
        RepairingStatusComponent
    ],
    entryComponents: [RepairWithScenarioSettingsComponent, RepairSettingsComponent],
    providers: [RepairingService]
})
export class RepairingModule {}
