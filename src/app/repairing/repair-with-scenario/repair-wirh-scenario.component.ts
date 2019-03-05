import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { execute } from '../../shared/execute';
import { PaymentProcessingService } from '../../thrift/payment-processing.service';
import { RepairingService } from '../repairing.service';
import { map } from 'rxjs/operators';

enum Status {
    repaired = 'machine repaired',

    update = 'status updated',

    unknown = 'unknown',

    unknownError = 'unknown error',
    invalidUser = 'invalid user',
    invoiceNotFound = 'invoice not found',
    invalidRequest = 'invalid request'
}

enum Scenario {
    // complex = 'complex',
    fail_pre_processing = 'fail_pre_processing',
    // skip_inspector = 'skip_inspector',
    fail_session = 'fail_session'
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
    displayedColumns: string[] = ['id', 'status', 'actions'];
    dataSource: Array<Element> = [];
    scenarios = Object.values(Scenario);
    codes: string[] = ['authorization_failed'];
    filteredCodes: Observable<string[]>;

    idsControl: FormControl;
    scenarioControl: FormControl;
    codeControl: FormControl = new FormControl('');

    @Input()
    progress$: BehaviorSubject<boolean | number>;
    @Input()
    isLoading: boolean;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private paymentProcessingService: PaymentProcessingService,
        private keycloakService: KeycloakService,
        private repairingService: RepairingService
    ) {
        this.idsControl = fb.control('');
        this.scenarioControl = fb.control(Scenario.fail_pre_processing);
        this.filteredCodes = this.codeControl.valueChanges.pipe(
            map(code =>
                code ? this.codes.filter(c => c.toLowerCase().indexOf(code) !== -1) : this.codes
            )
        );
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

    repair(elements: Element[] = this.dataSource) {
        if (!elements.length) {
            return;
        }
        this.progress$.next(0);
        for (const element of elements) {
            element.status = Status.update;
        }
        const scenario: any = {
            fail_session: {
                failure: { code: this.codeControl.value }
            }
        };
        const user: any = {
            id: this.keycloakService.getUsername(),
            type: { internal_user: {} }
        };
        execute(
            elements.map(({ id }) => () =>
                this.paymentProcessingService.repairWithScenario(user, id, scenario)
            )
        ).subscribe(result => {
            this.progress$.next(result.progress);
            const element = elements[result.idx];
            if (result.hasError) {
                element.status = this.statusByError(result.error);
                element.error = Array.isArray(result.error.errors)
                    ? result.error.errors.join('. ')
                    : '';
            } else {
                element.status = Status.repaired;
                element.error = '';
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
