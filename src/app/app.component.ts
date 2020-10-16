import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { GeneralRole } from '@cc/app/shared/services';

import { AppAuthGuardService } from './app-auth-guard.service';

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
            { name: 'Domain config', route: '/domain', activateRoles: [GeneralRole.Domain] },
            { name: 'Payouts', route: '/payouts', activateRoles: [GeneralRole.Payout] },
            {
                name: 'Claims-Deprecated',
                route: '/claims-deprecated',
                activateRoles: [GeneralRole.Claim],
            },
            { name: 'Claims', route: '/claims', activateRoles: [GeneralRole.Claim] },
            {
                name: 'Payment adjustment',
                route: '/payment-adjustment',
                activateRoles: [GeneralRole.Adjustment],
            },
            { name: 'Parties', route: '/parties', activateRoles: [GeneralRole.Party] },
            { name: 'Repairing', route: '/repairing', activateRoles: [GeneralRole.Domain] },
            { name: 'Deposits', route: '/deposits', activateRoles: [GeneralRole.Deposit] },
            { name: 'Operations', route: '/operations', activateRoles: [GeneralRole.Party] },
        ];
        return menuItems.filter((item) =>
            this.appAuthGuardService.userHasRoles(item.activateRoles)
        );
    }
}
