import { NgModule } from '@angular/core';

import { NotificationModule } from '../notification';
import { ErrorService } from './error.service';

@NgModule({
    imports: [NotificationModule],
    providers: [ErrorService],
})
export class ErrorModule {}
