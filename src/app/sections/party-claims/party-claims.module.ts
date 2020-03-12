import { NgModule } from '@angular/core';

import { PartyClaimsRoutingModule } from './party-claims-routing.module';
import { PartyClaimsComponent } from './party-claims.component';
import { PartyClaimsService } from './party-claims.service';

@NgModule({
    imports: [PartyClaimsRoutingModule],
    declarations: [PartyClaimsComponent],
    providers: [PartyClaimsService]
})
export class PartyClaimsModule {}
