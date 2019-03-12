import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { execute, ExecStateType } from '../../shared/execute';
import { PaymentProcessingService } from '../../thrift/payment-processing.service';
import { RepairingService } from '../repairing.service';
import {
    RepairWithScenarioSettingsComponent,
    DialogData
} from './repair-with-scenario-settings/repair-with-scenario-settings.component';
import { InvoiceRepairScenario } from 'src/app/gen-damsel/payment_processing';
import { RepairingStatusType } from '../repairing-status/repairing-status.component';

enum Status {
    repaired = 'machine repaired',
    update = 'status updated',
    unknown = 'unknown',
    unknownError = 'unknown error',
    invalidUser = 'invalid user',
    invoiceNotFound = 'invoice not found',
    invalidRequest = 'invalid request'
}

interface Element {
    id: string;
    status: Status;
    error?: string;
}

@Component({
    selector: 'cc-repair-with-scenario',
    templateUrl: 'repair-with-scenario.component.html',
    styleUrls: ['../repairing.component.css'],
    providers: []
})
export class RepairWithScenarioComponent {
    displayedColumns: string[] = ['select', 'id', 'status'];
    dataSource: Element[] = [];
    selection = new SelectionModel<Element>(true, []);
    progress$: BehaviorSubject<number>;
    isLoading: boolean;

    constructor(
        private paymentProcessingService: PaymentProcessingService,
        private repairingService: RepairingService,
        private dialog: MatDialog
    ) {
        this.progress$ = this.repairingService.progress$;
        this.repairingService.isLoading$.subscribe(isLoading => (this.isLoading = isLoading));
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

    getScenario(scenario: string, code: string): InvoiceRepairScenario {
        return {
            [scenario]: {
                failure: { code }
            }
        };
    }

    repairDialog() {
        const dialogRef = this.dialog.open(RepairWithScenarioSettingsComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(({ scenario, code }: DialogData) => {
            this.repair(this.selection.selected, this.getScenario(scenario, code));
        });
    }

    executeRepairWithScenario(elements: Element[], scenario: InvoiceRepairScenario) {
        const user = this.repairingService.getUser();
        return execute(
            elements.map(({ id }) => () =>
                this.paymentProcessingService.repairWithScenario(user, id, scenario)
            )
        );
    }

    repair(elements: Element[], scenario: InvoiceRepairScenario) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        this.setStatus(elements, Status.update);
        this.executeRepairWithScenario(elements, scenario).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.type === ExecStateType.error) {
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
