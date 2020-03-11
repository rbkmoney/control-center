import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'cc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    username: string;

    menuItems: { name: string; route: string }[] = [];

    constructor(private keycloakService: KeycloakService) {}

    ngOnInit() {
        this.username = this.keycloakService.getUsername();
        this.menuItems = this.getMenuItems();
    }

    logout() {
        this.keycloakService.logout();
    }

    private getMenuItems() {
        const menuItems = [
            { name: 'Domain config', route: '/domain', activateRoles: ['dmt:checkout'] },
            { name: 'Payouts', route: '/payouts', activateRoles: ['payout:read'] },
            {
                name: 'Claims-Deprecated',
                route: '/claims-deprecated',
                activateRoles: ['claim:get']
            },
            { name: 'Claims', route: '/claims', activateRoles: ['get_claims'] },
            { name: 'Claim-MGT', route: '/claim-mgt', activateRoles: ['get_claims'] },
            {
                name: 'Payment adjustment',
                route: '/payment-adjustment',
                activateRoles: ['adjustment:create']
            },
            { name: 'Parties', route: '/parties', activateRoles: ['party:get'] },
            { name: 'Repairing', route: '/repairing', activateRoles: ['party:get'] },
            { name: 'Deposits', route: '/deposits', activateRoles: ['deposit:write'] }
        ];
        const userRoles = this.keycloakService.getUserRoles();
        return menuItems.filter(
            item => item.activateRoles.filter(role => userRoles.includes(role)).length > 0
        );
    }
}
