import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange, MatSnackBar } from '@angular/material';

import { PartyTarget } from '../party-target';
import { PartyTargetService } from './party-target.service';
import { SelectableItem } from './selectable-item';

@Component({
    selector: 'cc-party-target',
    templateUrl: 'party-target.component.html',
    providers: [PartyTargetService]
})
export class PartyTargetComponent implements OnInit {

    @Input()
    partyID: string;

    @Input()
    partyTarget: PartyTarget;

    @Output()
    valueChanges: EventEmitter<string> = new EventEmitter();

    items: SelectableItem[];

    loading = true;

    constructor(private partyTargetService: PartyTargetService,
                private snackBar: MatSnackBar) {
    }

    change(item: SelectableItem, change: MatCheckboxChange) {

    }

    ngOnInit() {
        this.partyTargetService.getSelectableItems(this.partyID, this.partyTarget)
            .subscribe((items) => {
                this.loading = false;
                this.items = items;
            }, () => {
                this.loading = false;
                this.snackBar.open('An error occurred while party receiving', 'OK');
            });
    }
}
