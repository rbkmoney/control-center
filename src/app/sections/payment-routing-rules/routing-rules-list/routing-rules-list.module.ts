import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { RoutingRulesListComponent } from './routing-rules-list.component';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
    ],
    declarations: [RoutingRulesListComponent],
    exports: [RoutingRulesListComponent],
})
export class RoutingRulesListModule {}
