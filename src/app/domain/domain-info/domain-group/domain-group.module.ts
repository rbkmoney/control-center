import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
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
