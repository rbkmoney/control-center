import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SendCommentComponent } from './send-comment.component';

@NgModule({
    declarations: [SendCommentComponent],
    imports: [
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        FlexModule,
        MatInputModule,
        CommonModule,
    ],
    exports: [SendCommentComponent],
})
export class SendCommentModule {}
