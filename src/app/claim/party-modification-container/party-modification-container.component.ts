import { Component, Input, OnInit } from '@angular/core';

import { PartyModificationContainer, ModificationGroupType, ModificationUnitContainer } from '../model';
import { PersistentContainerService } from '../persistent-container.service';

@Component({
    selector: 'cc-party-modification-container',
    templateUrl: 'party-modification-container.component.html'
})
export class PartyModificationContainerComponent implements OnInit {

    @Input()
    container: PartyModificationContainer;

    @Input()
    type: ModificationGroupType;

    modifications: ModificationUnitContainer[];

    constructor(private persistentContainerService: PersistentContainerService) {
    }

    ngOnInit() {
        this.modifications = this.container.unitContainers
            .slice()
            .reverse();
    }

    remove(typeHash: string) {
        this.persistentContainerService.removeContainer(typeHash);
    }
}
