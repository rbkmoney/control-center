import { NgModule } from '@angular/core';

import { UserInfoBasedIdGeneratorService } from './user-info-based-id-generator.service';

@NgModule({
    providers: [UserInfoBasedIdGeneratorService],
})
export class UserInfoBasedIdGeneratorModule {}
