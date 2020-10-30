import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

import { NotFoundComponent } from './not-found';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: '/payouts',
                    pathMatch: 'full'
                },
                {
                    path: '404',
                    component: NotFoundComponent
                },
                // {
                //     path: '**',
                //     redirectTo: '/404'
                // }
            ],
            { paramsInheritanceStrategy: 'always' }
        )
    ],
    providers: [AppAuthGuardService],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
