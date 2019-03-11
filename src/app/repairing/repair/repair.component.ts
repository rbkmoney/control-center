import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';

import { execute } from '../../shared/execute';
import { RepairingService } from '../repairing.service';
import { map } from 'rxjs/operators';
import { RepairerService } from 'src/app/fistful/repairer.service';

enum Status {
    repaired = 'machine repaired',

    update = 'status updated',

    unknown = 'unknown',

    unknownError = 'unknown error',
    withdrawalSessionNotFound = 'withdrawal session not found',
    machineAlreadyWorking = 'machine already working'
}

enum Scenario {
    // add_events = 'add_events',
    set_session_result = 'set_session_result'
}

interface Element {
    id: string;
    status: Status;
}

@Component({
    selector: 'cc-repair',
    templateUrl: 'repair.component.html',
    styleUrls: ['../repairing.component.css'],
    providers: []
})
export class RepairComponent {
    displayedColumns: string[] = ['id', 'status'];
    dataSource: Array<Element> = [];
    scenarios = Object.values(Scenario);
    codes: string[] = ['unknown'];
    filteredCodes: Observable<string[]>;

    idsControl: FormControl;
    scenarioControl: FormControl;
    codeControl: FormControl;

    @Input()
    progress$: BehaviorSubject<boolean | number>;
    @Input()
    isLoading: boolean;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private repairerService: RepairerService,
        private repairingService: RepairingService
    ) {
        this.idsControl = fb.control('');
        this.scenarioControl = fb.control(Scenario.set_session_result);
        this.codeControl = fb.control(this.codes[0]);
        this.filteredCodes = this.codeControl.valueChanges.pipe(
            map(code =>
                code ? this.codes.filter(c => c.toLowerCase().indexOf(code) !== -1) : this.codes
            )
        );
    }

    add() {
        const ids = this.repairingService.execIdsFromStr(
            this.idsControl.value,
            this.dataSource.map(({ id }) => id)
        );
        this.idsControl.setValue('');
        const ns = this.scenarioControl.value;
        this.dataSource = this.dataSource.concat(
            ids.map(id => ({ id, ns, status: Status.unknown }))
        );
    }

    remove(element) {
        const resultDataSource = this.dataSource.slice();
        resultDataSource.splice(resultDataSource.findIndex(e => e === element), 1);
        this.dataSource = resultDataSource;
    }

    setStatus(elements: Element[] = this.dataSource, status = Status.update) {
        for (const element of elements) {
            element.status = status;
        }
    }

    statusByError(error: any) {
        switch (error.name) {
            case 'WithdrawalSessionNotFound':
                return Status.withdrawalSessionNotFound;
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
        const scenario = {
            [this.scenarioControl.value]: {
                result: { failed: { failure: { code: this.codeControl.value } } }
            }
        };
        execute(
            elements.map(({ id }) => () => this.repairerService.repair(id, scenario))
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
            case Status.repaired:
                return 'primary';
            case Status.unknown:
            case Status.update:
                return 'accent';
            default:
                return 'warn';
        }
    }
}
