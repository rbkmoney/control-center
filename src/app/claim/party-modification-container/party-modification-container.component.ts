import { Component, Input, OnInit } from '@angular/core';

import { PartyModificationContainer } from '../model';
import { ContractModificationUnit, ShopModificationUnit } from '../../backend/model/damsel';

@Component({
    selector: 'cc-party-modification-container',
    templateUrl: 'party-modification-container.component.html'
})
export class PartyModificationContainerComponent implements OnInit {

    @Input()
    container: PartyModificationContainer;

    modifications: ContractModificationUnit[] | ShopModificationUnit[];

    ngOnInit() {
        this.modifications = this.container.modifications
            .slice()
            .reverse();
    }
}
