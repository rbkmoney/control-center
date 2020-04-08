import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PartyTarget } from '../party-target';
import { PartyTargetService } from './party-target.service';
import { SelectableItem } from './selectable-item';

@Component({
    selector: 'cc-party-target',
    templateUrl: 'party-target.component.html',
    providers: [PartyTargetService],
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

    constructor(private partyTargetService: PartyTargetService, private snackBar: MatSnackBar) {}

    change(item: SelectableItem, change: MatCheckboxChange) {
        for (const selectedItem of this.items) {
            selectedItem.checked = false;
        }
        item.checked = change.checked;
        const value = change.checked ? item.id : '';
        this.valueChanges.emit(value);
    }

    ngOnInit() {
        this.partyTargetService.getSelectableItems(this.partyID, this.partyTarget).subscribe(
            (items) => {
                this.loading = false;
                this.items = items;
            },
            () => {
                this.loading = false;
                this.snackBar.open('An error occurred while party receiving', 'OK');
            }
        );
    }
}
