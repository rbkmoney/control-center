import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { execute } from '../../shared/execute';
import { RepairingService } from '../repairing.service';
import { RepairerService } from 'src/app/fistful/repairer.service';
import { DialogComponent, DialogData } from './dialog/dialog.component';
import { RepairScenario } from 'src/app/fistful/gen-model/withdrawal_session';

enum Status {
    repaired = 'machine repaired',

    update = 'status updated',

    unknown = 'unknown',

    unknownError = 'unknown error',
    withdrawalSessionNotFound = 'withdrawal session not found',
    machineAlreadyWorking = 'machine already working'
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
    displayedColumns: string[] = ['select', 'id', 'status'];
    dataSource: Array<Element> = [];
    selection = new SelectionModel<Element>(true, []);
    idsControl: FormControl;

    @Input()
    progress$: BehaviorSubject<boolean | number>;
    @Input()
    isLoading: boolean;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private repairerService: RepairerService,
        private repairingService: RepairingService,
        private dialog: MatDialog
    ) {
        this.idsControl = fb.control('');
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
        this.dataSource = this.dataSource.concat(ids.map(id => ({ id, status: Status.unknown })));
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

    getStatusByError(error: any) {
        switch (error.name) {
            case 'WithdrawalSessionNotFound':
                return Status.withdrawalSessionNotFound;
            case 'MachineAlreadyWorking':
                return Status.machineAlreadyWorking;
            default:
                return Status.unknownError;
        }
    }

    getScenario(scenario: string, code: string): RepairScenario {
        return {
            [scenario]: {
                result: { failed: { failure: { code: code } } }
            }
        };
    }

    repairDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(({ scenario, code }: DialogData) => {
            this.repair(this.selection.selected, this.getScenario(scenario, code));
        });
    }

    executeRepair(elements: Element[], scenario: RepairScenario) {
        return execute(elements.map(({ id }) => () => this.repairerService.repair(id, scenario)));
    }

    repair(elements: Element[] = this.selection.selected, scenario: RepairScenario) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        this.setStatus(elements, Status.update);
        this.executeRepair(elements, scenario).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.hasError) {
                element.status = this.getStatusByError(result.error);
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
