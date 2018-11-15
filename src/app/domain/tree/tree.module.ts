import { NgModule } from '@angular/core';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { TreeComponent } from './tree.component';
import { NodeComponent } from './node/node.component';
import { LabelComponent } from './node/label/label.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FlexLayoutModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatCheckboxModule,
        FormsModule
    ],
    declarations: [
        TreeComponent,
        NodeComponent,
        LabelComponent
    ],
    exports: [
        TreeComponent
    ],
    providers: []
})
export class TreeModule {
}
