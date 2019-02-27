import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

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

    constructor(private fb: FormBuilder) {
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
        this.dataSource = this.dataSource.concat(ids.map(id => ({ id })));
    }
}
