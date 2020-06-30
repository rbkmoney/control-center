import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { PartyClaimRoutingModule } from './party-claim-routing.module';
import { PartyClaimComponent } from './party-claim.component';
import { SendCommentModule } from './send-comment/send-comment.module';
import { ConversationModule } from './conversation';

@NgModule({
    imports: [
        PartyClaimRoutingModule,
        FlexModule,
        MatSelectModule,
        MatCardModule,
        FileUploaderModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        SendCommentModule,
        ConversationModule
    ],
    declarations: [PartyClaimComponent],
})
export class PartyClaimModule {}
