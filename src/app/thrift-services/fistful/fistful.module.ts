import { NgModule } from '@angular/core';

import { FistfulAdminService } from './fistful-admin.service';
import { RepairerService } from './repairer.service';

@NgModule({
    providers: [RepairerService, FistfulAdminService]
})
export class FistfulModule {}
