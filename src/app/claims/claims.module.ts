import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
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

import { PapiModule } from '../papi/papi.module';
import { SharedModule } from '../shared/shared.module';
import { ClaimActionsComponent } from './claim-actions/claim-actions.component';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsTableComponent } from './claims-table/claims-table.component';
import { ClaimsComponent } from './claims.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { SearchFormComponent } from './search-form/search-form.component';

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
        SharedModule,
    ],
    declarations: [
        ClaimsComponent,
        SearchFormComponent,
        ClaimsTableComponent,
        ClaimActionsComponent,
        CreateClaimComponent,
    ],
    entryComponents: [CreateClaimComponent],
})
export class ClaimsModule {}
