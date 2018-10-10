import { Component, Input, OnInit } from '@angular/core';

import { PartyModificationContainer, UnitContainerType } from '../model';
import { ModificationUnitContainer } from '../model/modification-unit-container';

@Component({
    selector: 'cc-party-modification-container',
    templateUrl: 'party-modification-container.component.html'
})
export class PartyModificationContainerComponent implements OnInit {

    @Input()
    container: PartyModificationContainer;

    @Input()
    type: UnitContainerType;

    modifications: ModificationUnitContainer[];

    ngOnInit() {
        this.modifications = this.container.unitContainers
            .slice()
            .reverse();
    }

    remove(unit: ModificationUnitContainer) {
        console.log('remove candidat', unit);
    }
}
