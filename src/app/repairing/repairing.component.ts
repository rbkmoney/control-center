import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

import { AutomatonService } from '../machinegun/automaton.service';
import { execute, SuccessResult } from '../shared/execute';
import { Machine } from '../machinegun/gen-model/state_processing';
import { Namespace } from '../machinegun/model/namespace';

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
    machine?: Machine;
}

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.css'],
    providers: []
})
export class RepairingComponent {
    displayedColumns: string[] = ['id', 'status', 'timer', 'actions'];
    dataSource: Array<Element> = [];
    idsControl: FormControl;
    progress: boolean | number = false;

    constructor(
        private fb: FormBuilder,
        private automatonService: AutomatonService,
        private snackBar: MatSnackBar
    ) {
        this.idsControl = fb.control('');
    }

    get isLoading() {
        return this.progress !== false && this.progress !== 1;
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
        this.dataSource = this.dataSource.concat(ids.map(id => ({ id, status: Status.update })));
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
        this.progress = 0;
        this.setStatus(elements);
        execute(
            elements.map(({ id }) => () =>
                this.automatonService.getMachine({
                    ns: Namespace.invoice,
                    ref: { id },
                    range: { limit: 0, direction: 1 }
                })
            )
        ).subscribe(result => {
            this.progress = result.progress;
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
        this.progress = 0;
        for (const element of elements) {
            element.status = Status.update;
        }
        execute(
            elements.map(({ id }) => () =>
                this.automatonService.simpleRepair(Namespace.invoice, { id })
            )
        ).subscribe(result => {
            this.progress = result.progress;
            console.log(result);
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
