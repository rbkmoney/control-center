import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { PipesModule } from '@cc/app/shared/pipes/pipes.module';

import { MonacoEditorModule } from '../../monaco-editor';
import { DomainObjReviewComponent } from './domain-obj-review.component';

@NgModule({
    declarations: [DomainObjReviewComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MonacoEditorModule,
        PipesModule,
        MatIconModule,
    ],
    exports: [DomainObjReviewComponent],
})
export class DomainObjReviewModule {}
