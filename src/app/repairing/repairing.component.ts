import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { uniqBy } from 'lodash-es';

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

    constructor(private fb: FormBuilder, private automatonService: AutomatonService) {
        this.idsControl = fb.control('');
    }

    add() {
        const ids: string[] = [];
        const selectIds = /[a-z0-9-]+/gi;
        let execId: string[];
        while ((execId = selectIds.exec(this.idsControl.value))) {
            ids.push(execId[0]);
        }
        this.idsControl.setValue('');
        this.dataSource = uniqBy(
            this.dataSource.concat(ids.map(id => ({ id, status: Status.update }))),
            'id'
        );
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
                    ns: 'invoice',
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
                this.automatonService.simpleRepair('Invoice', { id })
            )
        ).subscribe(result => {
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
