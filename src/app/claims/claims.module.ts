import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { ClaimsComponent } from './claims.component';
import { ClaimsRoutingModule } from './claims-routing.module';
import { PapiModule } from '../papi/papi.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { ClaimsTableComponent } from './claims-table/claims-table.component';

@NgModule({
    imports: [
        CommonModule,
        ClaimsRoutingModule,
        FlexLayoutModule,
        PapiModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        CdkTableModule
    ],
    declarations: [
        ClaimsComponent,
        SearchFormComponent,
        ClaimsTableComponent
    ]
})
export class ClaimsModule {
}
