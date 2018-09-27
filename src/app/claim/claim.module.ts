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
import { DomainModule } from '../domain/domain.module';
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
import { TerminalObjectComponent } from './terminal-object/terminal-object.component';

@NgModule({
    imports: [
        PapiModule,
        DomainModule,
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
        AcceptClaimComponent,
        DenyClaimComponent,
        PartyModificationUnitsComponent,
        ContainerNamePipe,
        CreateModificationComponent,
        TerminalObjectComponent
    ],
    entryComponents: [
        UnitActionsComponent,
        AcceptClaimComponent,
        DenyClaimComponent,
        CreateModificationComponent
    ],
    providers: [
        ClaimService
    ]
})
export class ClaimModule {
}
