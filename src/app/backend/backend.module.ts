import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ClaimService } from './claim.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ClaimService
    ]
})
export class BackendModule {
}
