import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService } from '../../../app-auth-guard.service';
import { PartySearchComponent } from './party-search.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartySearchComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class PartySearchRouting {}
