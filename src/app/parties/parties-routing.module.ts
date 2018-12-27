import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PartiesComponent } from './parties.component';
import { PartiesAuthGuardService } from './parties-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'parties',
                component: PartiesComponent,
                canActivate: [PartiesAuthGuardService]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        PartiesAuthGuardService
    ]
})
export class PartiesRoutingModule {}
