import { NgModule } from '@angular/core';
import {
    MatBadgeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTreeModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { TreeComponent } from './tree.component';
import { NodeComponent } from './node/node.component';

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
        MatTreeModule
    ],
    declarations: [
        TreeComponent,
        NodeComponent
    ],
    exports: [
        TreeComponent
    ],
    providers: []
})
export class TreeModule {
}
