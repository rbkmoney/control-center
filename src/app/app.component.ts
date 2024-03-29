import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import {
    AppAuthGuardService,
    ClaimManagementRole,
    DomainConfigRole,
    OperationRole,
    PartyRole,
    PaymentAdjustmentRole,
    PayoutRole,
} from '@cc/app/shared/services';

@Component({
    selector: 'cc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    username: string;

    menuItems: { name: string; route: string }[] = [];

    constructor(
        private keycloakService: KeycloakService,
        private appAuthGuardService: AppAuthGuardService
    ) {}

    ngOnInit() {
        this.keycloakService.loadUserProfile().then(() => {
            this.username = this.keycloakService.getUsername();
            this.menuItems = this.getMenuItems();
        });
    }

    logout() {
        this.keycloakService.logout();
    }

    private getMenuItems() {
        const menuItems = [
            { name: 'Domain config', route: '/domain', activateRoles: [DomainConfigRole.Checkout] },
            { name: 'Payouts', route: '/payouts', activateRoles: [PayoutRole.Read] },
            // FR-688
            // {
            //     name: 'Claims-Deprecated',
            //     route: '/claims-deprecated',
            //     activateRoles: [ClaimManagementRole.GetClaims],
            // },
            { name: 'Claims', route: '/claims', activateRoles: [ClaimManagementRole.GetClaims] },
            {
                name: 'Payment adjustment',
                route: '/payment-adjustment',
                activateRoles: [PaymentAdjustmentRole.Create],
            },
            { name: 'Merchants', route: '/parties', activateRoles: [PartyRole.Get] },
            { name: 'Repairing', route: '/repairing', activateRoles: [DomainConfigRole.Checkout] },
            {
                name: 'Operations',
                route: '/operations',
                activateRoles: [OperationRole.SearchOperations],
            },
        ];
        return menuItems.filter((item) =>
            this.appAuthGuardService.userHasRoles(item.activateRoles)
        );
    }
}
