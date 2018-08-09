import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    username: string;

    menuItems: { name: string, route: string }[] = [
        {name: 'Domain config', route: '/domain'},
        {name: 'Payouts', route: '/payouts'},
        {name: 'Claims', route: '/claims'}
    ];

    constructor(private keycloakService: KeycloakService) {}

    ngOnInit() {
        this.username = this.keycloakService.getUsername();
    }

    logout() {
        this.keycloakService.logout();
    }
}
