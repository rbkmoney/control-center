import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ClaimService } from './claim.service';
import { PartyService } from './party.service';
import { PayoutsService } from './payouts.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [ClaimService, PayoutsService, PartyService],
})
export class PapiModule {}
