import { NgModule } from '@angular/core';

import { RepairerService } from './repairer.service';
import { FistfulAdminService } from './fistful-admin.service';

@NgModule({
    providers: [RepairerService, FistfulAdminService]
})
export class FistfulModule {}
