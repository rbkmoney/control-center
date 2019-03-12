import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { KeycloakService } from 'keycloak-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserInfo } from '../gen-damsel/payment_processing';

@Injectable()
export class RepairingService {
    progress$: BehaviorSubject<number> = new BehaviorSubject(1);
    isLoading$: Observable<boolean>;

    constructor(private snackBar: MatSnackBar, private keycloakService: KeycloakService) {
        this.isLoading$ = this.progress$.pipe(map(progress => progress !== 1));
    }

    combineIds(addedIds: string[], currentIds: string[] = []) {
        const ids: string[] = [];
        const alreadyAddedIds: string[] = [];
        for (const id of addedIds) {
            if (ids.includes(id) || currentIds.includes(id)) {
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
