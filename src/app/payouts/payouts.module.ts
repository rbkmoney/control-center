import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule, MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';

import { PayoutsComponent } from './payouts.component';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { PapiModule } from '../papi/papi.module';
import { PayoutsService } from '../papi/payouts.service';
import { PayoutsTableComponent } from './payouts-table/payouts-table.component';

@NgModule({
    imports: [
        CommonModule,
        PayoutsRoutingModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        FlexLayoutModule,
        PapiModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        CdkTableModule,
        MatTableModule
    ],
    declarations: [
        PayoutsComponent,
        SearchFormComponent,
        PayoutsTableComponent
    ],
    providers: [
        PayoutsService
    ]
})
export class PayoutsModule {
}
