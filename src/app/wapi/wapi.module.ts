import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WithdrawalsService } from './withdrawals.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [WithdrawalsService]
})
export class WapiModule {}
