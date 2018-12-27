import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DomainGroupComponent } from './domain-group.component';
import { DomainGroupInfoComponent } from './domain-group-info/domain-group-info.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [DomainGroupComponent, DomainGroupInfoComponent],
    imports: [
        CommonModule,
        MatExpansionModule,
        MatTableModule,
        CdkTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FlexLayoutModule,
        SharedModule
    ],
    exports: [DomainGroupComponent],
    providers: []
})
export class DomainGroupModule {}
