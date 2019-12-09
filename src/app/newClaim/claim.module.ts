import { NgModule } from '@angular/core';
import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClaimManagementService } from '../thrift/claim-management.service';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule
} from '@angular/material';
import { FlexModule } from '@angular/flex-layout';
import { AcceptClaimComponent } from './accept-claim/accept-claim.component';
import { DenyClaimComponent } from './deny-claim/deny-claim.component';
import { ClaimService } from './claim.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ClaimRoutingModule,
        SharedModule,
        CommonModule,
        MatCardModule,
        FlexModule,
        MatProgressBarModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatInputModule
    ],
    declarations: [ClaimComponent, DetailsComponent, AcceptClaimComponent, DenyClaimComponent],
    entryComponents: [AcceptClaimComponent, DenyClaimComponent],
    providers: [ClaimService, ClaimManagementService]
})
export class ClaimModule {}
