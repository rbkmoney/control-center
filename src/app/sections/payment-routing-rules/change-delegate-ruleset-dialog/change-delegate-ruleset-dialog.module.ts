import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ChangeDelegateRulesetDialogComponent } from './change-delegate-ruleset-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
    ],
    declarations: [ChangeDelegateRulesetDialogComponent],
    exports: [ChangeDelegateRulesetDialogComponent],
    providers: [],
})
export class ChangeDelegateRulesetDialogModule {}
