import { NgModule } from '@angular/core';
import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';

@NgModule({
    imports: [ClaimRoutingModule],
    declarations: [ClaimComponent]
})
export class ClaimModule {}
