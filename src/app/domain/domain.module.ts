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
import { FlexModule } from '@angular/flex-layout';

import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { DomainService } from './domain.service';
import { ThriftModule } from '../thrift/thrift.module';
import { DomainGroupModule } from './domain-group';
import { MetadataLoader } from './metadata-loader';
import { SharedModule } from '../shared/shared.module';
import { DomainDetailsService } from './domain-details.service';

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
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ThriftModule,
        DomainGroupModule,
        SharedModule
    ],
    providers: [DomainService, MetadataLoader, DomainDetailsService]
})
export class DamainModule {}
