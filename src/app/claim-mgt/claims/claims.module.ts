import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { PapiModule } from '../../papi/papi.module';
import { ClaimsComponent } from './claims.component';
import { ClaimsRoutingModule } from './claims-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { ClaimsTableComponent } from './claims-table/claims-table.component';
import { ClaimActionsComponent } from './claim-actions/claim-actions.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { ClaimsService } from './claims.service';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { SharedModule } from '../../shared/shared.module';

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
