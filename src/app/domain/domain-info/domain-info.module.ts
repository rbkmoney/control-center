import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DomainInfoComponent } from './domain-info.component';
import { DomainObjDetailsComponent } from './domain-obj-details';
import { DomainGroupModule } from './domain-group';
import { MonacoEditorModule } from '../../monaco-editor';
import { ThriftModule } from '../../thrift-services/thrift.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [DomainInfoComponent, DomainObjDetailsComponent],
    imports: [
        CommonModule,
        DomainGroupModule,
        FlexLayoutModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MonacoEditorModule,
        ThriftModule,
        SharedModule
    ]
})
export class DomainInfoModule {}
