import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';
import { DomainService } from './domain.service';
import { MetadataModule } from '../metadata/metadata.module';
import { TreeModule } from './tree/tree.module';
import { ObjectComponent } from './object/object.component';
import { SharedModule } from '../shared/shared.module';

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
        MatSnackBarModule,
        MatTableModule,
        MatExpansionModule,
        MatToolbarModule,
        MatBadgeModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        DomainComponent,
        ObjectComponent
    ],
    providers: [
        DomainService
    ]
})
export class DomainModule {
}
