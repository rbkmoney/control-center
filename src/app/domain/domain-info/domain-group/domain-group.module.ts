import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
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

import { PrettyJsonModule } from '@cc/components/pretty-json';

import { DomainGroupComponent } from './domain-group.component';
import { DomainObjectsTypeSelectorComponent } from './domain-objects-type-selector';
import { GroupControlComponent } from './group-control';
import { GroupTableComponent } from './group-table';

@NgModule({
    declarations: [
        DomainGroupComponent,
        DomainObjectsTypeSelectorComponent,
        GroupControlComponent,
        GroupTableComponent,
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
        MatSortModule,
        PrettyJsonModule,
    ],
    exports: [DomainGroupComponent],
})
export class DomainGroupModule {}
