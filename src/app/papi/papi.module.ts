import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ClaimService } from './claim.service';
import { ContractService } from './contract.service';
import { PartyService } from './party.service';
import { PayoutsService } from './payouts.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [ClaimService, ContractService, PayoutsService, PartyService],
})
export class PapiModule {}
