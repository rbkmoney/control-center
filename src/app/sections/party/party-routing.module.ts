import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, PartyRole } from '@cc/app/shared/services';

import { PartyComponent } from './party.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyID',
                component: PartyComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [PartyRole.Get],
                },
                children: [
                    {
                        path: 'payments',
                        loadChildren: () =>
                            import('../party-payments').then((m) => m.PartyPaymentsModule),
                    },
                    {
                        path: 'claims',
                        loadChildren: () =>
                            import('../party-claims').then((m) => m.PartyClaimsModule),
                    },
                    {
                        path: 'claim/:claimID',
                        loadChildren: () =>
                            import('../party-claim').then((m) => m.PartyClaimModule),
                    },
                    {
                        path: 'shops',
                        loadChildren: () =>
                            import('../party-shops').then((m) => m.PartyShopsModule),
                    },
                    {
                        path: 'shop/:shopID',
                        loadChildren: () =>
                            import('../shop-details').then((m) => m.ShopDetailsModule),
                    },
                    {
                        path: 'invoice/:invoiceID/payment/:paymentID',
                        loadChildren: () =>
                            import('../payment-details').then((m) => m.PaymentDetailsModule),
                    },
                    {
                        path: 'payment-routing-rules',
                        loadChildren: () =>
                            import('../payment-routing-rules').then(
                                (m) => m.PaymentRoutingRulesModule
                            ),
                    },
                    {
                        path: 'chargebacks',
                        loadChildren: () =>
                            import('../party-chargebacks').then((m) => m.PartyChargebacksModule),
                    },
                    {
                        path: 'invoice/:invoiceID/payment/:paymentID/chargeback/:chargebackID',
                        loadChildren: () =>
                            import('../chargeback-details').then((m) => m.ChargebackDetailsModule),
                    },
                    { path: '', redirectTo: 'payments', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PartyRouting {}
