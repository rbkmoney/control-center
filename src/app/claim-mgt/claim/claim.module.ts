import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import {
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';

import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { ConversationModule } from './conversation/conversation.module';
import { StatusChangerComponent } from './status-changer/status-changer.component';
import { PartyModificationTargetModule } from '../../party-modification-target';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { UnitActionsComponent } from './party-modification-creator/unit-actions/unit-actions.component';
import { ContainerNamePipe } from './party-modification-creator/container-name.pipe';
import { PartyModificationCreationModule } from './party-modification-creator/creation';
import { CreateModificationComponent } from './party-modification-creator/create-modification.component';
import { ClaimService } from './claim.service';

@NgModule({
    imports: [
        ClaimRoutingModule,
        SharedModule,
        CommonModule,
        MatCardModule,
        FlexModule,
        MatSelectModule,
        ConversationModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatBottomSheetModule,
        MatStepperModule,
        PartyModificationTargetModule,
        PartyModificationCreationModule
    ],
    declarations: [
        ClaimComponent,
        DetailsComponent,
        StatusChangerComponent,
        CreateModificationComponent,
        ContainerNamePipe,
        UnitActionsComponent
    ],
    entryComponents: [StatusChangerComponent, CreateModificationComponent, UnitActionsComponent],
    providers: [ClaimManagementService, ClaimService]
})
export class ClaimModule {}
