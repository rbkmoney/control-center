import { Component, Input } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PayPayoutsComponent } from '../pay-payouts/pay-payouts.component';
import { ConfirmPayoutsComponent } from '../confirm-payouts/confirm-payouts.component';
import { CreatePayoutComponent } from '../create-payout/create-payout.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'cc-payouts-actions',
    templateUrl: 'payouts-actions.component.html'
})
export class PayoutsActionsComponent {
    @Input()
    selectedPayoutsIds: string[];

    constructor(private keycloakService: KeycloakService,
                private dialogRef: MatDialog) {
    }

    pay() {
        this.dialogRef.open(PayPayoutsComponent, {data: this.selectedPayoutsIds});
    }

    confirmPayouts() {
        this.dialogRef.open(ConfirmPayoutsComponent, {data: this.selectedPayoutsIds});
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
