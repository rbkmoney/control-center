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
                    roles: ['get_claims'],
                },
                children: [
                    {
                        path: 'payments',
                        loadChildren: () =>
                            import('../party-payments').then((m) => m.PartyPaymentsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims'],
                        },
                    },
                    {
                        path: 'claims',
                        loadChildren: () =>
                            import('../party-claims').then((m) => m.PartyClaimsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims'],
                        },
                    },
                    {
                        path: 'claim/:claimID',
                        loadChildren: () =>
                            import('../party-claim').then((m) => m.PartyClaimModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims'],
                        },
                    },
                    {
                        path: 'shops',
                        loadChildren: () =>
                            import('../party-shops').then((m) => m.PartyShopsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims'],
                        },
                    },
                    {
                        path: 'invoice/:invoiceID/payment/:paymentID',
                        loadChildren: () =>
                            import('../payment-details').then((m) => m.PaymentDetailsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims'],
                        },
                    },
                    {
                        path: 'payment-routing-rules',
                        loadChildren: () =>
                            import('../payment-routing-rules').then(
                                (m) => m.PaymentRoutingRulesModule
                            ),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [],
                        },
                    },
                    { path: '', redirectTo: 'payments', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PartyMgtRouting {}
