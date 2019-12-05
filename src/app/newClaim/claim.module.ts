import { NgModule } from '@angular/core';
import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClaimManagementService } from '../thrift/claim-management.service';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { MatCardModule } from '@angular/material';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
    imports: [ClaimRoutingModule, SharedModule, CommonModule, MatCardModule, FlexModule],
    declarations: [ClaimComponent, DetailsComponent],
    providers: [ClaimManagementService]
})
export class ClaimModule {}
