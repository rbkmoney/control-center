import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PartiesComponent } from './parties.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'parties',
                component: PartiesComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get']
                }
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PartiesRoutingModule {}
