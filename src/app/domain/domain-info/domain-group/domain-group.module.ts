import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { DomainGroupComponent } from './domain-group.component';
import { SharedModule } from '../../../shared/shared.module';
import { GroupControlComponent } from './group-control';
import { DomainObjectsTypeSelectorComponent } from './domain-objects-type-selector';
import { GroupTableComponent } from './group-table';

@NgModule({
    declarations: [
        DomainGroupComponent,
        DomainObjectsTypeSelectorComponent,
        GroupControlComponent,
        GroupTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatExpansionModule,
        MatTableModule,
        CdkTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FlexLayoutModule,
        MatCardModule,
        MatCheckboxModule,
        MatSelectModule,
        SharedModule,
        MatSortModule
    ],
    exports: [DomainGroupComponent]
})
export class DomainGroupModule {}
