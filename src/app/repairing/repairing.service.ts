import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { KeycloakService } from 'keycloak-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserInfo, InvoiceRepairScenario } from '../gen-damsel/payment_processing';
import { execute } from '../shared/execute';
import { AutomatonService } from '../machinegun/automaton.service';
import { PaymentProcessingService } from '../thrift/payment-processing.service';
import { RepairerService } from '../fistful/repairer.service';
import { RepairScenario } from '../fistful/gen-model/withdrawal_session';

@Injectable()
export class RepairingService {
    progress$: BehaviorSubject<number> = new BehaviorSubject(1);
    isLoading$: Observable<boolean>;

    constructor(
        private snackBar: MatSnackBar,
        private keycloakService: KeycloakService,
        private automatonService: AutomatonService,
        private paymentProcessingService: PaymentProcessingService,
        private repairerService: RepairerService
    ) {
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

    remove<E>(currentElements: E[], elements: E[]) {
        const resultDataSource = currentElements.slice();
        for (const element of elements) {
            resultDataSource.splice(resultDataSource.findIndex(e => e === element), 1);
        }
        return resultDataSource;
    }

    setStatus<E extends { status: S }, S>(elements: E[], status: S) {
        for (const element of elements) {
            element.status = status;
        }
    }

    executeGetMachine<E extends { id: string; ns: string }>(elements: E[]) {
        return execute(
            elements.map(({ id, ns }) => () =>
                this.automatonService.getMachine({
                    ns,
                    ref: { id },
                    range: { limit: 0, direction: 1 }
                })
            )
        );
    }

    executeSimpleRepair<E extends { id: string; ns: string }>(elements: E[]) {
        return execute(
            elements.map(({ id, ns }) => () => this.automatonService.simpleRepair(ns, { id }))
        );
    }

    executeRepairWithScenario<E extends { id: string }>(
        elements: E[],
        scenario: InvoiceRepairScenario
    ) {
        const user = this.getUser();
        return execute(
            elements.map(({ id }) => () =>
                this.paymentProcessingService.repairWithScenario(user, id, scenario)
            )
        );
    }

    executeRepair<E extends { id: string }>(elements: E[], scenario: RepairScenario) {
        return execute(elements.map(({ id }) => () => this.repairerService.repair(id, scenario)));
    }
}
