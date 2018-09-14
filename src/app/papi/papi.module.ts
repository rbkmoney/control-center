import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ClaimService } from './claim.service';
import { CategoryService } from './category.service';
import { ContractService } from './contract.service';
import { PayoutsService } from './payouts.service';
import { PartyService } from './party.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ClaimService,
        CategoryService,
        ContractService,
        PayoutsService,
        PartyService
    ]
})
export class PapiModule {}
