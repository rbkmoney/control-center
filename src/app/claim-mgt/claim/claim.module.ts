import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { DetailsComponent } from './details/details.component';
import { ConversationModule } from './conversation/conversation.module';

@NgModule({
    imports: [
        ClaimRoutingModule,
        SharedModule,
        CommonModule,
        MatCardModule,
        FlexModule,
        ConversationModule,
        MatSelectModule
    ],
    declarations: [ClaimComponent, DetailsComponent],
    providers: [ClaimManagementService]
})
export class ClaimModule {}
