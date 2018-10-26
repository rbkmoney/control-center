import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog } from '@angular/material';
import { CreateClaimComponent } from '../create-claim/create-claim.component';

@Component({
    selector: 'cc-claim-actions',
    templateUrl: 'claim-actions.component.html'
})
export class ClaimActionsComponent implements OnInit {
    roles: string[];

    constructor(private keycloakService: KeycloakService,
                private dialogRef: MatDialog) {
    }

    ngOnInit() {
        this.roles = this.keycloakService.getUserRoles();
    }

    createClaim() {
        this.dialogRef.open(CreateClaimComponent, {
            width: '720px',
            disableClose: true
        });
    }

    hasRole(role: string): boolean {
        return this.roles.includes(role);
    }
}
