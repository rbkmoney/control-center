import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { AutomatonService } from '../../machinegun/automaton.service';
import { execute, SuccessResult } from '../../shared/execute';
import { Machine } from '../../machinegun/gen-model/state_processing';
import { Namespace } from '../../machinegun/model/namespace';
import { PaymentProcessingService } from '../../thrift/payment-processing.service';
import { RepairingService } from '../repairing.service';

enum Status {
    found = 'machine found',
    repaired = 'machine repaired',

    update = 'status updated',

    unknownError = 'unknown error',
    namespaceNotFound = 'namespace not found',
    machineNotFound = 'machine not found',
    machineFailed = 'machine failed',
    eventNotFound = 'event not found',
    machineAlreadyWorking = 'machine already working'
}

interface Element {
    id: string;
    status: Status;
    ns: Namespace;
    machine?: Machine;
}

@Component({
    selector: 'cc-repair-with-scenario',
    templateUrl: 'repair-with-scenario.component.html',
    styleUrls: ['../repairing.component.css'],
    providers: []
})
export class RepairWithScenarioComponent {
    displayedColumns: string[] = ['id', 'ns', 'timer', 'status', 'actions'];
    dataSource: Array<Element> = [];
    namespaces = Object.values(Namespace);

    idsControl: FormControl;
    nsControl: FormControl;

    @Input()
    progress$: BehaviorSubject<boolean | number>;
    @Input()
    isLoading: boolean;

    constructor(
        private fb: FormBuilder,
        private automatonService: AutomatonService,
        private snackBar: MatSnackBar,
        private paymentProcessingService: PaymentProcessingService,
        private keycloakService: KeycloakService,
        private repairingService: RepairingService
    ) {
        this.idsControl = fb.control('');
        this.nsControl = fb.control(Namespace.invoice);
    }

    add() {
        const ids: string[] = [];
        const selectIds = /[a-z0-9-]+/gi;
        let execId: string[];
        const alreadyAddedIds: string[] = [];
        while ((execId = selectIds.exec(this.idsControl.value))) {
            const id = execId[0];
            if (
                this.dataSource.findIndex(el => el.id === id) >= 0 ||
                ids.findIndex(addedId => addedId === id) >= 0
            ) {
                if (alreadyAddedIds.findIndex(alreadyAddedId => alreadyAddedId === id) === -1) {
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
        this.idsControl.setValue('');
        const ns = this.nsControl.value;
        this.dataSource = this.dataSource.concat(
            ids.map(id => ({ id, ns, status: Status.update }))
        );
        this.updateStatus(this.dataSource.filter(el => ids.find(id => id === el.id)));
    }

    remove(element) {
        const resultDataSource = this.dataSource.slice();
        resultDataSource.splice(resultDataSource.findIndex(e => e === element), 1);
        this.dataSource = resultDataSource;
    }

    setStatus(elements: Element[] = this.dataSource, status = Status.update) {
        for (const element of elements) {
            element.status = Status.update;
        }
    }

    updateStatus(elements: Element[]) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        this.setStatus(elements);
        execute(
            elements.map(({ id, ns }) => () =>
                this.automatonService.getMachine({
                    ns,
                    ref: { id },
                    range: { limit: 0, direction: 1 }
                })
            )
        ).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.hasError) {
                element.status = this.statusByError(result.error);
            } else {
                element.status = Status.found;
                element.machine = (result as SuccessResult).data;
            }
        });
    }

    statusByError(error: any) {
        switch (error.name) {
            case 'MachineNotFound':
                return Status.machineNotFound;
            case 'MachineFailed':
                return Status.machineFailed;
            case 'NamespaceNotFound':
                return Status.namespaceNotFound;
            case 'MachineAlreadyWorking':
                return Status.machineAlreadyWorking;
            default:
                return Status.unknownError;
        }
    }

    repair(elements: Element[] = this.dataSource) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        for (const element of elements) {
            element.status = Status.update;
        }
        execute(
            elements.map(({ id, ns }) => () => this.automatonService.simpleRepair(ns, { id }))
        ).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.hasError) {
                element.status = this.statusByError(result.error);
            } else {
                element.status = Status.repaired;
            }
        });
    }

    repairWithScenario(elements: Element[] = this.dataSource) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        for (const element of elements) {
            element.status = Status.update;
        }
        const scenario: any = { fail_session: { failure: { code: 'authorization_failed' } } };
        execute(
            elements.map(({ id }) => () =>
                this.paymentProcessingService.repairWithScenario(
                    {
                        id: this.keycloakService.getUsername(),
                        type: { internalUser: {} }
                    },
                    id,
                    scenario
                )
            )
        ).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.hasError) {
                element.status = this.statusByError(result.error);
            } else {
                element.status = Status.repaired;
            }
        });
    }

    getColor(status: Status) {
        switch (status) {
            case Status.found:
            case Status.repaired:
                return 'primary';
            case Status.update:
                return 'accent';
            default:
                return 'warn';
        }
    }

    getTimer(element: Element): string {
        if (element.machine) {
            return moment(element.machine.timer).format('L LTS');
        }
        return '';
    }
}
