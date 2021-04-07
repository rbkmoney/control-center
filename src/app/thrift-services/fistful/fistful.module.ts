import { NgModule } from '@angular/core';

import { FistfulAdminService } from './fistful-admin.service';
import { RepairerService } from './repairer.service';
import { RevertManagementService } from './revert-management.service';

@NgModule({
    providers: [RepairerService, FistfulAdminService, RevertManagementService],
})
export class FistfulModule {}
