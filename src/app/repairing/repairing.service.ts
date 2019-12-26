import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { KeycloakService } from 'keycloak-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
    UserInfo,
    InvoiceRepairScenario
} from '../thrift-services/damsel/gen-model/payment_processing';
import { execute } from '../shared/execute';
import { AutomatonService } from '../thrift-services/machinegun/automaton.service';
import { PaymentProcessingService } from '../thrift-services/payment-processing.service';
import { RepairerService } from '../thrift-services/fistful/repairer.service';
import { RepairScenario } from '../thrift-services/fistful/gen-model/withdrawal_session';

@Injectable()
export class RepairingService {
    private _progress$: BehaviorSubject<number> = new BehaviorSubject(1);

    constructor(
        private snackBar: MatSnackBar,
        private keycloakService: KeycloakService,
        private automatonService: AutomatonService,
        private paymentProcessingService: PaymentProcessingService,
        private repairerService: RepairerService
    ) {}

    get progress$(): Observable<number> {
        return this._progress$;
    }

    get isLoading$(): Observable<boolean> {
        return this._progress$.pipe(map(progress => progress !== 1));
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
        this._progress$.next(0);
        return execute(
            elements.map(({ id, ns }) => () =>
                this.automatonService.getMachine({
                    ns,
                    ref: { id },
                    range: { limit: 0, direction: 1 }
                })
            )
        ).pipe(tap(({ progress }) => this._progress$.next(progress)));
    }

    executeSimpleRepair<E extends { id: string; ns: string }>(elements: E[]) {
        this._progress$.next(0);
        return execute(
            elements.map(({ id, ns }) => () => this.automatonService.simpleRepair(ns, { id }))
        ).pipe(tap(({ progress }) => this._progress$.next(progress)));
    }

    executeRepairWithScenario<E extends { id: string }>(
        elements: E[],
        scenario: InvoiceRepairScenario
    ) {
        const user = this.getUser();
        this._progress$.next(0);
        return execute(
            elements.map(({ id }) => () =>
                this.paymentProcessingService.repairWithScenario(user, id, scenario)
            )
        ).pipe(tap(({ progress }) => this._progress$.next(progress)));
    }

    executeRepair<E extends { id: string }>(elements: E[], scenario: RepairScenario) {
        this._progress$.next(0);
        return execute(
            elements.map(({ id }) => () => this.repairerService.repair(id, scenario))
        ).pipe(tap(({ progress }) => this._progress$.next(progress)));
    }
}
