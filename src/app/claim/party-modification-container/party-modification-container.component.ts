import { Component, Input, OnInit } from '@angular/core';

import {
    PartyModificationContainer,
    ModificationGroupType,
    ModificationUnitContainer
} from '../model';
import { ClaimService } from '../claim.service';

@Component({
    selector: 'cc-party-modification-container',
    templateUrl: 'party-modification-container.component.html',
    styleUrls: ['./party-modification-container.component.css']
})
export class PartyModificationContainerComponent implements OnInit {
    @Input()
    container: PartyModificationContainer;

    @Input()
    type: ModificationGroupType;

    modifications: ModificationUnitContainer[];

    constructor(private claimService: ClaimService) {}

    ngOnInit() {
        this.modifications = this.container.unitContainers.slice();
    }

    remove(typeHash: string) {
        this.claimService.removeModification(typeHash);
    }
}
