import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { PartyClaimActionsComponent } from './party-claim-actions.component';
import { SendCommentModule } from './send-comment/send-comment.module';
import { StatusChangerModule } from './status-changer';

@NgModule({
    declarations: [PartyClaimActionsComponent],
    imports: [
        MatCardModule,
        FlexModule,
        MatButtonModule,
        SendCommentModule,
        FileUploaderModule,
        StatusChangerModule,
    ],
    exports: [PartyClaimActionsComponent],
})
export class PartyClaimActionsModule {}
