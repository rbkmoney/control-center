import { NgModule } from '@angular/core';

import { SearchPaymentsRoutingModule } from './search-payments-routing.module';
import { SearchPaymentsComponent } from './search-payments.component';

@NgModule({
    imports: [SearchPaymentsRoutingModule],
    declarations: [SearchPaymentsComponent],
})
export class SearchPaymentsModule {}
