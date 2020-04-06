import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { PartiesComponent } from './parties.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'parties',
                component: PartiesComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['party:get']
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class PartiesRoutingModule {}
