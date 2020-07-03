import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ConversationModule } from '../../claim-mgt/claim/conversation/conversation.module';
import { PartyClaimRoutingModule } from './party-claim-routing.module';
import { PartyClaimComponent } from './party-claim.component';

@NgModule({
    imports: [
        PartyClaimRoutingModule,
        FlexModule,
        MatSelectModule,
        MatCardModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        ConversationModule,
    ],
    declarations: [PartyClaimComponent],
})
export class PartyClaimModule {}
