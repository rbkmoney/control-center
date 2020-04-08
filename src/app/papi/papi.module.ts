import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CategoryService } from './category.service';
import { ClaimService } from './claim.service';
import { ContractService } from './contract.service';
import { PartyService } from './party.service';
import { PayoutsService } from './payouts.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [ClaimService, CategoryService, ContractService, PayoutsService, PartyService],
})
export class PapiModule {}
