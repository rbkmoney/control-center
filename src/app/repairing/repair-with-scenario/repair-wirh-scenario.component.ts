import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { InvoiceRepairScenario } from '../../thrift-services/damsel/gen-model/payment_processing';
import { ExecStateType } from '../execute';
import { RepairingStatusType } from '../repairing-status/repairing-status.component';
import { RepairingService } from '../repairing.service';
import {
    DialogData,
    RepairWithScenarioSettingsComponent,
} from './repair-with-scenario-settings/repair-with-scenario-settings.component';

enum Status {
    /* eslint-disable @typescript-eslint/naming-convention */
    repaired = 'machine repaired',
    update = 'status updated',
    unknown = 'unknown',
    unknownError = 'unknown error',
    invalidUser = 'invalid user',
    invoiceNotFound = 'invoice not found',
    invalidRequest = 'invalid request',
    /* eslint-enable @typescript-eslint/naming-convention */
}

interface Element {
    id: string;
    status: Status;
    error?: string;
}

@Component({
    selector: 'cc-repair-with-scenario',
    templateUrl: 'repair-with-scenario.component.html',
    styleUrls: ['../repairing.component.scss'],
    providers: [],
})
export class RepairWithScenarioComponent {
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
        if (this.isAllSelected()) this.selection.clear();
        else this.selection.select(...this.dataSource);
    }

    add(addedIds: string[]) {
        const ids = this.repairingService.combineIds(
            addedIds,
            this.dataSource.map(({ id }) => id)
        );
        this.dataSource = this.dataSource.concat(ids.map((id) => ({ id, status: Status.unknown })));
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
            case 'InvalidUser':
                return Status.invalidUser;
            case 'InvoiceNotFound':
                return Status.invoiceNotFound;
            case 'InvalidRequest':
                return Status.invalidRequest;
            default:
                return Status.unknownError;
        }
    }

    repairDialog() {
        const dialogRef = this.dialog.open(RepairWithScenarioSettingsComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(({ scenario, code }: DialogData) => {
            this.repair(this.selection.selected, {
                [scenario]: {
                    failure: { code },
                },
            });
        });
    }

    repair(elements: Element[], scenario: InvoiceRepairScenario) {
        if (!elements.length) {
            return;
        }
        this.setStatus(elements, Status.update);
        this.repairingService.executeRepairWithScenario(elements, scenario).subscribe((result) => {
            const element = elements[result.idx];
            if (result.type === ExecStateType.Error) {
                element.status = this.getStatusByError(result.error);
                element.error = Array.isArray(result.error.errors)
                    ? result.error.errors.join('. ')
                    : '';
            } else {
                element.status = Status.repaired;
                element.error = '';
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
