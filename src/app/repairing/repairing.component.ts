import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AutomatonService } from '../machinegun/automaton.service';
import { execute } from '../shared/execute';

enum Status {
    update = 'update',
    found = 'found',
    repaired = 'repaired',
    notFound = 'not found',
    error = 'error'
}

interface Element {
    id: string;
    status: Status;
}

enum Namespace {
    invoice = 'invoice'
}

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.css'],
    providers: []
})
export class RepairingComponent {
    isLoading = false;
    displayedColumns: string[] = ['id', 'status', 'actions'];
    dataSource: Array<Element> = [];
    idsControl: FormControl;

    constructor(
        private fb: FormBuilder,
        private automatonService: AutomatonService,
        private snackBar: MatSnackBar
    ) {
        this.idsControl = fb.control('');
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

    updateStatus(elements: Element[]) {
        for (const element of elements) {
            element.status = Status.update;
            this.automatonService
                .getMachine({
                    ns: Namespace.invoice,
                    ref: { id: element.id },
                    range: { limit: 0, direction: 1 }
                })
                .subscribe(
                    machine => {
                        element.status = Status.found;
                    },
                    error => {
                        element.status = Status.notFound;
                    }
                );
        }
    }

    repair() {
        execute(
            this.dataSource.map(({ id }) => () =>
                this.automatonService.simpleRepair(Namespace.invoice, { id })
            )
        ).subscribe(result => {
            console.log(this.dataSource[result.idx]);
            console.log(result);
        });
    }

    getColor(status: Status) {
        switch (status) {
            case Status.repaired:
                return 'primary';
            case Status.found:
                return 'accent';
            case Status.error:
            case Status.notFound:
                return 'warn';
            case Status.update:
            default:
                return '';
        }
    }
}
