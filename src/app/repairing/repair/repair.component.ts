import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { ExecStateType } from '../../shared/execute';
import { RepairingService } from '../repairing.service';
import { RepairSettingsComponent, DialogData } from './repair-settings/repair-settings.component';
import { RepairScenario } from '../../fistful/gen-model/withdrawal_session';
import { RepairingStatusType } from '../repairing-status/repairing-status.component';

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
    dataSource: Element[] = [];
    selection = new SelectionModel<Element>(true, []);
    isLoading$: Observable<boolean>;

    constructor(private repairingService: RepairingService, private dialog: MatDialog) {
        this.isLoading$ = repairingService.isLoading$;
    }

    isAllSelected() {
        return this.selection.selected.length === this.dataSource.length;
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.dataSource);
    }

    add(addedIds: string[]) {
        const ids = this.repairingService.combineIds(addedIds, this.dataSource.map(({ id }) => id));
        this.dataSource = this.dataSource.concat(ids.map(id => ({ id, status: Status.unknown })));
    }

    remove(elements: Element[] = this.selection.selected) {
        this.selection.clear();
        this.dataSource = this.repairingService.remove(this.dataSource, elements);
    }

    setStatus(elements: Element[] = this.dataSource, status = Status.update) {
        this.repairingService.setStatus(elements, status);
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
        const dialogRef = this.dialog.open(RepairSettingsComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(({ scenario, code }: DialogData) => {
            this.repair(this.selection.selected, this.getScenario(scenario, code));
        });
    }

    repair(elements: Element[] = this.selection.selected, scenario: RepairScenario) {
        if (!elements.length) {
            return;
        }
        this.setStatus(elements, Status.update);
        this.repairingService.executeRepair(elements, scenario).subscribe(result => {
            const element = elements[result.idx];
            if (result.type === ExecStateType.error) {
                element.status = this.getStatusByError(result.error);
            } else {
                element.status = Status.repaired;
            }
        });
    }

    getRepairingStatusType(status: Status) {
        switch (status) {
            case Status.repaired:
                return RepairingStatusType.info;
            case Status.unknown:
            case Status.update:
                return RepairingStatusType.warn;
            default:
                return RepairingStatusType.error;
        }
    }
}
