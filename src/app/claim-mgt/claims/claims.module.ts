import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
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
import { PapiModule } from '../../papi/papi.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { ClaimsTableComponent } from './claims-table/claims-table.component';
import { ClaimActionsComponent } from './claim-actions/claim-actions.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { SharedModule } from '../../shared/shared.module';
import { ClaimsService } from './claims.service';
import { ClaimManagementService } from '../../thrift/claim-management.service';
import { ClaimsRoutingModule } from './claims-routing.module';

@NgModule({
    imports: [
        ClaimsRoutingModule,
        CommonModule,
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
        MatDialogModule,
        CdkTableModule,
        SharedModule
    ],
    declarations: [
        ClaimsComponent,
        SearchFormComponent,
        ClaimsTableComponent,
        ClaimActionsComponent,
        CreateClaimComponent
    ],
    entryComponents: [CreateClaimComponent],
    providers: [ClaimsService, ClaimManagementService]
})
export class ClaimsModule {}
