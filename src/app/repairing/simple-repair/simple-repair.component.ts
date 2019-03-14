import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { ExecStateType } from '../../shared/execute';
import { Machine } from '../../machinegun/gen-model/state_processing';
import { Namespace } from '../../machinegun/model/namespace';
import { RepairingService } from '../repairing.service';
import { RepairingStatusType } from '../repairing-status/repairing-status.component';

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
    dataSource: Element[] = [];
    selection = new SelectionModel<Element>(true, []);
    namespaces = Object.values(Namespace);
    nsControl: FormControl;
    progress$: BehaviorSubject<number>;
    isLoading: boolean;

    constructor(fb: FormBuilder, private repairingService: RepairingService) {
        this.progress$ = this.repairingService.progress$;
        this.repairingService.isLoading$.subscribe(isLoading => (this.isLoading = isLoading));
        this.nsControl = fb.control(Namespace.invoice);
    }

    isAllSelected() {
        return this.selection.selected.length === this.dataSource.length;
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.dataSource);
    }

    add(addedIds: string[]) {
        const ids = this.repairingService.combineIds(addedIds, this.dataSource.map(({ id }) => id));
        const ns = this.nsControl.value;
        this.dataSource = this.dataSource.concat(
            ids.map(id => ({ id, ns, status: Status.update }))
        );
        this.updateStatus(this.dataSource.filter(el => ids.includes(el.id)));
    }

    remove(elements: Element[] = this.selection.selected) {
        this.selection.clear();
        this.dataSource = this.repairingService.remove(this.dataSource, elements);
    }

    setStatus(elements: Element[] = this.dataSource, status = Status.update) {
        this.repairingService.setStatus(elements, status);
    }

    updateStatus(elements: Element[]) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        this.setStatus(elements);
        this.repairingService.executeGetMachine(elements).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.type === ExecStateType.error) {
                element.status = this.statusByError(result.error);
            } else {
                element.status = Status.found;
                element.machine = result.data;
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

    repair(elements: Element[] = this.selection.selected) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        this.setStatus(elements, Status.update);
        this.repairingService.executeSimpleRepair(elements).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.type === ExecStateType.error) {
                element.status = this.statusByError(result.error);
            } else {
                element.status = Status.repaired;
            }
        });
    }

    getRepairingStatusType(status: Status) {
        switch (status) {
            case Status.found:
            case Status.repaired:
                return RepairingStatusType.info;
            case Status.update:
                return RepairingStatusType.warn;
            default:
                return RepairingStatusType.error;
        }
    }
}
