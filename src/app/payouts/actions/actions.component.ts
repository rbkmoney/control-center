import { Component, Input } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PayDialogComponent } from '../pay-dialog/pay-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreatePayoutComponent } from '../create-dialog/create-payout.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'cc-payouts-actions',
    templateUrl: 'actions.component.html'
})
export class ActionsComponent {
    @Input()
    selectedPayoutsIds: string[];

    constructor(private keycloakService: KeycloakService,
                private dialogRef: MatDialog) {
    }

    pay() {
        this.dialogRef.open(PayDialogComponent, {data: this.selectedPayoutsIds});
    }

    confirmPayouts() {
        this.dialogRef.open(ConfirmDialogComponent, {data: this.selectedPayoutsIds});
    }

    createPayout() {
        this.dialogRef.open(CreatePayoutComponent, {
            width: '720px',
            disableClose: true
        });
    }

    hasRole(role: string): boolean {
        const roles = this.keycloakService.getUserRoles();
        return roles.includes(role);
    }
}
