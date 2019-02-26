import { NgModule } from '@angular/core';

import { RepairingComponent } from './repairing.component';
import { RepairingService } from './repairing.service';
import { RepairingRoutingModule } from './repairing-routing.module';

@NgModule({
    imports: [RepairingRoutingModule],
    declarations: [RepairingComponent],
    entryComponents: [],
    providers: [RepairingService]
})
export class RepairingModule {}
