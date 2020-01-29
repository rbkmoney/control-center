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

import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { ConversationModule } from './conversation/conversation.module';
import { StatusChangerComponent } from './status-changer/status-changer.component';
import { AddModificationSheetComponent } from './add-modification-sheet/add-modification-sheet.component';
import { ContainerNamePipe } from './add-modification-sheet/container-name.pipe';
import { CreateModificationComponent } from './create-modification/create-modification.component';
import { MatStepperModule } from '@angular/material/stepper';
import { PartyModificationTargetModule } from '../../party-modification-target';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { PartyModificationCreationModule } from './create-modification/party-modification-creation';

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
        AddModificationSheetComponent,
        CreateModificationComponent,
        ContainerNamePipe
    ],
    entryComponents: [
        StatusChangerComponent,
        AddModificationSheetComponent,
        CreateModificationComponent
    ],
    providers: [ClaimManagementService]
})
export class ClaimModule {}
