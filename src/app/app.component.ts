import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'cc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    username: string;

    menuItems: { name: string, route: string }[] = [];

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
            {name: 'Domain config', route: '/domain', activateRole: 'dmt:checkout'},
            {name: 'Payouts', route: '/payouts', activateRole: 'payout:read'},
            {name: 'Claims', route: '/claims', activateRole: 'claim:get'},
            {name: 'Payment adjustment', route: '/payment-adjustment', activateRole: 'adjustment:create'},
            {name: 'Parties', route: '/parties', activateRole: 'party:get'} // TODO: указать верную роль
        ];
        const roles = this.keycloakService.getUserRoles();
        return menuItems.filter((item) => roles.includes(item.activateRole));
    }
}
