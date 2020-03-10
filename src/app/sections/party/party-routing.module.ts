import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PartyComponent } from './party.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyID',
                component: PartyComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                },
                children: [
                    {
                        path: 'claims',
                        loadChildren: () =>
                            import('../party-claims').then(m => m.PartyClaimsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims']
                        }
                    },
                    {
                        path: 'shops',
                        loadChildren: () => import('../party-shops').then(m => m.PartyShopsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims']
                        }
                    },
                    { path: '', redirectTo: 'claims', pathMatch: 'full' },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class PartyMgtRouting {}
