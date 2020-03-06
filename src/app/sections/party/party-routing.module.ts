import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PartyComponent } from './party.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'party', redirectTo: 'party/search', pathMatch: 'full' },
            {
                path: 'party/search',
                loadChildren: () => import('./party-search').then(m => m.PartySearchModule),
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                }
            },
            {
                path: 'party/:partyID',
                component: PartyComponent,
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
                    },
                    {
                        path: '', redirectTo: 'claims', pathMatch: 'full'
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class PartyMgtRouting {
}
