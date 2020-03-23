import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PartyClaimsRoutingModule } from './party-claims-routing.module';
import { PartyClaimsComponent } from './party-claims.component';
import { ClaimsTableComponent } from './claims-table/claims-table.component';
import { ClaimSourcePipe } from './claims-table/claim-source.pipe';
import { ClaimStatusPipe } from './claims-table/claim-status.pipe';
import { SharedModule } from '../../shared/shared.module';
import { ClaimStatusBeautifierPipe } from './claim-status-beautifier.pipe';

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
        SharedModule
    ],
    declarations: [
        PartyClaimsComponent,
        ClaimsTableComponent,
        ClaimSourcePipe,
        ClaimStatusPipe,
        ClaimStatusBeautifierPipe
    ]
})
export class PartyClaimsModule {}
