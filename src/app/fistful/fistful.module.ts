import { NgModule } from '@angular/core';

import { RepairerService } from './repairer.service';
import { FistfulAdminService } from './fistful-admin.service';
import { MockedFistfulService } from './mocked-fistful.service';

@NgModule({
    providers: [RepairerService, FistfulAdminService, MockedFistfulService]
})
export class FistfulModule {}
