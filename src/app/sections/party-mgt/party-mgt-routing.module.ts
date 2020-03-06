import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PartyMgtComponent } from './party-mgt.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'party-mgt', redirectTo: 'party-mgt/search', pathMatch: 'full' },
            {
                path: 'party-mgt/search',
                loadChildren: () => import('./party-search').then(m => m.PartySearchModule),
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                }
            },
            {
                path: 'party-mgt/:partyID',
                component: PartyMgtComponent,
                children: [
                    {
                        path: 'claims',
                        loadChildren: () => import('./claims').then(m => m.ClaimsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims']
                        }
                    },
                    {
                        path: 'shops',
                        loadChildren: () => import('./shops').then(m => m.ShopsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims']
                        }
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class PartyMgtRouting {}
