import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { AutomatonService } from '../../machinegun/automaton.service';
import { execute, SuccessResult } from '../../shared/execute';
import { Machine } from '../../machinegun/gen-model/state_processing';
import { Namespace } from '../../machinegun/model/namespace';
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
    selector: 'cc-simple-repair',
    templateUrl: 'simple-repair.component.html',
    styleUrls: ['../repairing.component.css'],
    providers: []
})
export class SimpleRepairComponent {
    displayedColumns: string[] = ['select', 'id', 'ns', 'timer', 'status'];
    dataSource: Array<Element> = [];
    selection = new SelectionModel<Element>(true, []);
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
        private repairingService: RepairingService
    ) {
        this.idsControl = fb.control('');
        this.nsControl = fb.control(Namespace.invoice);
    }

    isAllSelected() {
        return this.selection.selected.length === this.dataSource.length;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.forEach(row => this.selection.select(row));
    }

    add() {
        const ids = this.repairingService.execIdsFromStr(
            this.idsControl.value,
            this.dataSource.map(({ id }) => id)
        );
        this.idsControl.setValue('');
        const ns = this.nsControl.value;
        this.dataSource = this.dataSource.concat(
            ids.map(id => ({ id, ns, status: Status.update }))
        );
        this.updateStatus(this.dataSource.filter(el => ids.includes(el.id)));
    }

    remove(elements: Element[] = this.selection.selected) {
        const resultDataSource = this.dataSource.slice();
        for (const element of elements) {
            resultDataSource.splice(resultDataSource.findIndex(e => e === element), 1);
        }
        this.selection.clear();
        this.dataSource = resultDataSource;
    }

    setStatus(elements: Element[] = this.dataSource, status = Status.update) {
        for (const element of elements) {
            element.status = status;
        }
    }

    executeGetMachine(elements: Element[]) {
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

    updateStatus(elements: Element[]) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        this.setStatus(elements);
        this.executeGetMachine(elements).subscribe(result => {
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

    executeSimpleRepair(elements: Element[]) {
        return execute(
            elements.map(({ id, ns }) => () => this.automatonService.simpleRepair(ns, { id }))
        );
    }

    repair(elements: Element[] = this.selection.selected) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        this.setStatus(elements, Status.update);
        this.executeSimpleRepair(elements).subscribe(result => {
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
