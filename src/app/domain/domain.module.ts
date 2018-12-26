import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule
} from '@angular/material';
import { FlexModule } from '@angular/flex-layout';

import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { DomainService } from './domain.service';
import { ThriftModule } from '../thrift/thrift.module';
import { DomainGroupModule } from './domain-group';
import { MetadataLoader } from './metadata-loader';

@NgModule({
    declarations: [DomainComponent],
    imports: [
        CommonModule,
        DomainRoutingModule,
        FlexModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSidenavModule,
        ThriftModule,
        DomainGroupModule
    ],
    providers: [DomainService, MetadataLoader]
})
export class DamainModule {}
