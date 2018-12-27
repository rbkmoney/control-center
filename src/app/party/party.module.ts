import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatRadioModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PartyComponent } from './party.component';
import { PartyRoutingModule } from './party-routing.module';
import { PartyActionsComponent } from './party-actions/party-actions.component';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { TerminalDecisionsComponent } from './party-actions/domain/terminal-decisions/terminal-decisions.component';

@NgModule({
    imports: [
        CommonModule,
        PartyRoutingModule,
        MatCardModule,
        FlexModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatStepperModule
    ],
    declarations: [
        PartyComponent,
        PartyActionsComponent,
        PartyDetailsComponent,
        TerminalDecisionsComponent
    ],
    entryComponents: [
        TerminalDecisionsComponent
    ]
})
export class PartyModule {}
