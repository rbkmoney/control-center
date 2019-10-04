import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';
import { CreateDepositService } from './create-deposit/create-deposit.service';
import { FistfulAdminService } from '../fistful/fistful-admin.service';

@NgModule({
    imports: [
        CommonModule,
        DepositsRoutingModule,
        FlexLayoutModule,
        MatCardModule,
        SharedModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule
    ],
    declarations: [DepositsComponent, CreateDepositComponent],
    providers: [CreateDepositService, FistfulAdminService]
})
export class DepositsModule {}
