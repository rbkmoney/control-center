import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { FlexModule } from '@angular/flex-layout';

import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClaimManagementService } from '../../thrift/claim-management.service';
import { DetailsComponent } from './details/details.component';

@NgModule({
    imports: [ClaimRoutingModule, SharedModule, CommonModule, MatCardModule, FlexModule],
    declarations: [ClaimComponent, DetailsComponent],
    providers: [ClaimManagementService]
})
export class ClaimModule {}
