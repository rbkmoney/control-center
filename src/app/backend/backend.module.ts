import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ClaimService } from './claim.service';
import { CategoryService } from './category.service';
import { ContractService } from './contract.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ClaimService,
        CategoryService,
        ContractService
    ]
})
export class BackendModule {
}
