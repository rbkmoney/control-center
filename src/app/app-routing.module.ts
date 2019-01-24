import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from './app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/payouts',
                pathMatch: 'full'
            }
        ])
    ],
    providers: [AppAuthGuardService],
    exports: [RouterModule]
})
export class AppRoutingModule {}
