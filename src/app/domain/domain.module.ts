import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';
import { DomainService } from './domain.service';
import { MetadataModule } from '../metadata/metadata.module';
import { TreeModule } from './tree/tree.module';

@NgModule({
    imports: [
        DomainRoutingModule,
        MatCardModule,
        MetadataModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CommonModule,
        TreeModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    declarations: [
        DomainComponent
    ],
    providers: [
        DomainService
    ]
})
export class DomainModule {
}
