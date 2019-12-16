import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule
} from '@angular/material';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClaimManagementService } from '../../thrift/claim-management.service';
import { DetailsComponent } from './details/details.component';
import { ClaimService } from './claim.service';
import { AcceptClaimComponent } from './accept-claim/accept-claim.component';
import { DenyClaimComponent } from './deny-claim/deny-claim.component';

@NgModule({
    imports: [
        ClaimRoutingModule,
        SharedModule,
        CommonModule,
        MatCardModule,
        FlexModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        FormsModule
    ],
    declarations: [ClaimComponent, DetailsComponent, AcceptClaimComponent, DenyClaimComponent],
    entryComponents: [AcceptClaimComponent, DenyClaimComponent],
    providers: [ClaimService, ClaimManagementService]
})
export class ClaimModule {}
