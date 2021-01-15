import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: '/payouts',
                    pathMatch: 'full',
                },
            ],
            { paramsInheritanceStrategy: 'always', relativeLinkResolution: 'legacy' }
        ),
    ],
    providers: [AppAuthGuardService],
    exports: [RouterModule],
})
export class AppRoutingModule {}
