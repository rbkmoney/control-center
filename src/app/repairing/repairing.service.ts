import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { KeycloakService } from 'keycloak-angular';
import { UserInfo } from '../gen-damsel/payment_processing';

@Injectable()
export class RepairingService {
    constructor(private snackBar: MatSnackBar, private keycloakService: KeycloakService) {}

    execIdsFromStr(str: string, currentIds: string[] = []) {
        const ids: string[] = [];
        const selectIds = /[a-z0-9-]+/gi;
        let execId: string[];
        const alreadyAddedIds: string[] = [];
        while ((execId = selectIds.exec(str))) {
            const id = execId[0];
            if (currentIds.includes(id) || ids.includes(id)) {
                if (!alreadyAddedIds.includes(id)) {
                    alreadyAddedIds.push(id);
                }
            } else {
                ids.push(id);
            }
        }
        if (alreadyAddedIds.length) {
            this.snackBar.open(`IDs: ${alreadyAddedIds.join(', ')} has already been added`, 'OK', {
                duration: 10000
            });
        }
        return ids;
    }

    getUser(): UserInfo {
        return {
            id: this.keycloakService.getUsername(),
            type: { internal_user: {} }
        };
    }
}
