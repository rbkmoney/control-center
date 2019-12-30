import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PapiModule } from '../papi/papi.module';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ClaimInfoComponent } from './claim-info/claim-info.component';
import { ClaimInfoDetailsComponent } from './claim-info/claim-info-details/claim-info-details.component';
import { PartyModificationsComponent } from './party-modifications/party-modifications.component';
import { PartyModificationContainerComponent } from './party-modification-container/party-modification-container.component';
import { UnitActionsComponent } from './unit-actions/unit-actions.component';
import { ClaimService } from './claim.service';
import { AcceptClaimComponent } from './accept-claim/accept-claim.component';
import { DenyClaimComponent } from './deny-claim/deny-claim.component';
import { SharedModule } from '../shared/shared.module';
import { ContainerNamePipe } from './container-name.pipe';
import { PartyModificationUnitsComponent } from './party-modification-units/party-modification-units.component';
import { PartyModificationCreationModule } from '../party-modification-creation';
import { CreateModificationComponent } from './create-modification/create-modification.component';
import { PartyModificationTargetModule } from '../party-modification-target';
import { PersistentContainerService } from './persistent-container.service';
import { CloneClaimComponent } from './clone-claim/clone-claim.component';
import { PartyModificationContainerService } from './party-modification-container/party-modification-container.service';
import { RemoveConfirmComponent } from './party-modification-container/remove-confirm/remove-confirm.component';
import { DamselModule } from '../thrift-services/damsel/damsel.module';

@NgModule({
    imports: [
        PapiModule,
        DamselModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        ClaimRoutingModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatBottomSheetModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule,
        MatSelectModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatRadioModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        PartyModificationCreationModule,
        PartyModificationTargetModule
    ],
    declarations: [
        ClaimComponent,
        ClaimInfoComponent,
        ClaimInfoDetailsComponent,
        PartyModificationsComponent,
        PartyModificationContainerComponent,
        UnitActionsComponent,
        CloneClaimComponent,
        AcceptClaimComponent,
        DenyClaimComponent,
        PartyModificationUnitsComponent,
        ContainerNamePipe,
        CreateModificationComponent,
        RemoveConfirmComponent
    ],
    entryComponents: [
        UnitActionsComponent,
        CloneClaimComponent,
        AcceptClaimComponent,
        DenyClaimComponent,
        CreateModificationComponent,
        RemoveConfirmComponent
    ],
    providers: [ClaimService, PersistentContainerService, PartyModificationContainerService]
})
export class ClaimModule {}
