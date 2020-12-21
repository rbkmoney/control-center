import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

@NgModule({
    imports: [MatSnackBarModule],
    providers: [NotificationService],
})
export class NotificationModule {}
