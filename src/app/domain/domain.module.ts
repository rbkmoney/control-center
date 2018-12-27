import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';
import { FlexModule } from '@angular/flex-layout';

import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { DomainService } from './domain.service';
import { ThriftModule } from '../thrift/thrift.module';
import { DomainGroupModule } from './domain-group';
import { MetadataLoader } from './metadata-loader';
import { DomainObjectDetailsComponent } from './domain-object-details/domain-object-details.component';
import { SharedModule } from '../shared/shared.module';
import { DomainObjectDetailsService } from './domain-object-details/domain-object-details.service';

@NgModule({
    declarations: [DomainComponent, DomainObjectDetailsComponent],
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
        ThriftModule,
        DomainGroupModule,
        SharedModule
    ],
    providers: [DomainService, MetadataLoader, DomainObjectDetailsService]
})
export class DamainModule {}
