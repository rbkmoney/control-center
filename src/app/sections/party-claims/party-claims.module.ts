import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule, MatProgressBarModule, MatSelectModule } from '@angular/material';

import { PartyClaimsRoutingModule } from './party-claims-routing.module';
import { PartyClaimsComponent } from './party-claims.component';
import { ClaimsTableComponent } from './claims-table/claims-table.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { ClaimStatusFromStringPipe } from './search-form/claim-status-from-string.pipe';

@NgModule({
    imports: [
        CommonModule,
        PartyClaimsRoutingModule,
        MatTableModule,
        MatCardModule,
        FlexLayoutModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        SharedModule
    ],
    declarations: [
        PartyClaimsComponent,
        ClaimsTableComponent,
        SearchFormComponent,
        ClaimStatusFromStringPipe
    ]
})
export class PartyClaimsModule {}
