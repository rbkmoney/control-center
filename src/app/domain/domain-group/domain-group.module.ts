import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material';

import { DomainGroupComponent } from './domain-group.component';
import { DomainGroupInfoComponent } from './domain-group-info/domain-group-info.component';
import { SharedModule } from '../../shared/shared.module';
import { DomainObjectsTypeSelectorComponent } from './domain-objects-type-selector/domain-objects-type-selector.component';

@NgModule({
    declarations: [
        DomainGroupComponent,
        DomainGroupInfoComponent,
        DomainObjectsTypeSelectorComponent
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
