import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { uniqBy } from 'lodash-es';

import { AutomatonService } from '../machinegun/automaton.service';
import { execute } from '../shared/execute';

@Component({
    templateUrl: 'repairing.component.html',
    styleUrls: ['repairing.component.css'],
    providers: []
})
export class RepairingComponent {
    isLoading = false;
    displayedColumns: string[] = ['id', 'actions'];
    dataSource: Array<{ id: string }> = [];
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
        this.dataSource = uniqBy(this.dataSource.concat(ids.map(id => ({ id }))), 'id');
    }

    remove(element) {
        const resultDataSource = this.dataSource.slice();
        resultDataSource.splice(resultDataSource.findIndex(e => e === element), 1);
        this.dataSource = resultDataSource;
    }

    repair() {
        execute(
            this.dataSource.map(({ id }) => () =>
                this.automatonService.simpleRepair('Invoice', { id })
            )
        ).subscribe((result) => {console.log(result)});
    }
}
