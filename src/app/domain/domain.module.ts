import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DomainComponent } from './domain.component';
import { DomainObjDetailsComponent } from './domain-obj-details';
import { DomainRoutingModule } from './domain-routing.module';
import { DomainService } from './domain.service';
import { ThriftModule } from '../thrift/thrift.module';
import { DomainGroupModule } from './domain-group';
import { MetadataLoader } from './metadata-loader';
import { SharedModule } from '../shared/shared.module';
import { DomainDetailsService } from './domain-details.service';
import { MonacoEditorModule } from '../monaco-editor';

@NgModule({
    declarations: [DomainComponent, DomainObjDetailsComponent],
    imports: [
        CommonModule,
        DomainRoutingModule,
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
        DomainGroupModule,
        SharedModule
    ],
    providers: [DomainService, MetadataLoader]
})
export class DamainModule {}
