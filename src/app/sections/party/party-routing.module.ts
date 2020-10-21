import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    AppAuthGuardService,
    ChargebackRole,
    ClaimManagementRole,
    DomainConfigRole,
    OperationRole,
    PartyRole,
} from '@cc/app/shared/services';

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
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [OperationRole.SearchPayments],
                        },
                    },
                    {
                        path: 'claims',
                        loadChildren: () =>
                            import('../party-claims').then((m) => m.PartyClaimsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [ClaimManagementRole.GetClaims],
                        },
                    },
                    {
                        path: 'claim/:claimID',
                        loadChildren: () =>
                            import('../party-claim').then((m) => m.PartyClaimModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [ClaimManagementRole.GetClaims],
                        },
                    },
                    {
                        path: 'shops',
                        loadChildren: () =>
                            import('../party-shops').then((m) => m.PartyShopsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [PartyRole.Get],
                        },
                    },
                    {
                        path: 'invoice/:invoiceID/payment/:paymentID',
                        loadChildren: () =>
                            import('../payment-details').then((m) => m.PaymentDetailsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [OperationRole.SearchPayments],
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
                            roles: [DomainConfigRole.Checkout],
                        },
                    },
                    {
                        path: 'chargebacks',
                        loadChildren: () =>
                            import('../party-chargebacks').then((m) => m.PartyChargebacksModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [ChargebackRole.View],
                        },
                    },
                    {
                        path: 'invoice/:invoiceID/payment/:paymentID/chargeback/:chargebackID',
                        loadChildren: () =>
                            import('../chargeback-details').then((m) => m.ChargebackDetailsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [ChargebackRole.Manage],
                        },
                    },
                    { path: '', redirectTo: 'payments', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PartyRouting {}
