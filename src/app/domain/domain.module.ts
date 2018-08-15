import { NgModule } from '@angular/core';

import { DomainTypedManager } from './domain-typed-manager';
import { DmtService } from './dmt.service';

@NgModule({
    providers: [
        DmtService,
        DomainTypedManager
    ]
})
export class DomainModule {}
