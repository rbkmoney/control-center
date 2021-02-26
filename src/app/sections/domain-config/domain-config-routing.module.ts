import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, DomainConfigRole } from '@cc/app/shared/services';

import { DomainConfigComponent } from './domain-config.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'domain-config',
                component: DomainConfigComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [DomainConfigRole.Checkout],
                },
                children: [
                    {
                        path: 'objects',
                        loadChildren: () =>
                            import('../domain-config-objects').then(
                                (m) => m.DomainConfigObjectsModule
                            ),
                    },
                    { path: '', redirectTo: 'objects', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DomainConfigRoutingModule {}
