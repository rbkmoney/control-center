import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { CommonPipesModule, ThriftPipesModule } from '@cc/app/shared/pipes';
import { CardContainerModule } from '@cc/components/card-container/card-container.module';

import { FistfulAdminService } from '../thrift-services/fistful/fistful-admin.service';
import { FistfulStatisticsService } from '../thrift-services/fistful/fistful-stat.service';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';
import { CreateDepositService } from './create-deposit/create-deposit.service';
import { DepositStatusPipe } from './deposit-status.pipe';
import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsTableComponent } from './deposits-table/deposits-table.component';
import { DepositsTableService } from './deposits-table/deposits-table.service';
import { DepositsComponent } from './deposits.component';
import { DepositsService } from './deposits.service';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchFormService } from './search-form/search-form.service';

@NgModule({
    imports: [
        CommonModule,
        DepositsRoutingModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        CardContainerModule,
        ThriftPipesModule,
        CommonPipesModule,
    ],
    declarations: [
        DepositsComponent,
        CreateDepositComponent,
        DepositsTableComponent,
        SearchFormComponent,
        DepositStatusPipe,
    ],
    providers: [
        CreateDepositService,
        FistfulAdminService,
        DepositsTableService,
        SearchFormService,
        DepositsService,
        FistfulStatisticsService,
    ],
    entryComponents: [CreateDepositComponent],
})
export class DepositsModule {}
