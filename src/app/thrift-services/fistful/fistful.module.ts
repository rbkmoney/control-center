import { NgModule } from '@angular/core';

import { FistfulAdminService } from './fistful-admin.service';
import { RepairerService } from './repairer.service';
import { WalletManagementService } from './wallet-management.service';

@NgModule({
    providers: [RepairerService, FistfulAdminService, WalletManagementService],
})
export class FistfulModule {}
