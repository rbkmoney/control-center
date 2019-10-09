import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';
import { CreateDepositService } from './create-deposit/create-deposit.service';
import { FistfulAdminService } from '../fistful/fistful-admin.service';
import { DepositsTableComponent } from './deposits-table/deposits-table.component';
import { DepositsTableService } from './deposits-table/deposits-table.service';
import { SearchFormService } from './search-form/search-form.service';
import { DepositsService } from './deposits.service';
import { FistfulStatisticsService } from '../fistful/fistful-stat.service';
import { SearchFormComponent } from './search-form/search-form.component';

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
        MatProgressBarModule,
        MatTableModule
    ],
    declarations: [
        DepositsComponent,
        CreateDepositComponent,
        DepositsTableComponent,
        SearchFormComponent
    ],
    providers: [
        CreateDepositService,
        FistfulAdminService,
        DepositsTableService,
        SearchFormService,
        DepositsService,
        FistfulStatisticsService
    ]
})
export class DepositsModule {}
