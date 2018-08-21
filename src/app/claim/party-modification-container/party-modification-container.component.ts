import { Component, Input, OnInit } from '@angular/core';

import { PartyModificationContainer } from '../model';
import { ContractModificationUnit, ShopModificationUnit } from '../../damsel';

@Component({
    selector: 'cc-party-modification-container',
    templateUrl: 'party-modification-container.component.html',
    styles: [`
        :host /deep/ .string {
            color: #008000;
            font-weight: bold;
        }

        :host /deep/ .number {
            color: #0000FF;
            font-weight: bold;
        }

        :host /deep/ .boolean {
            color: #000080;
            font-weight: bold;
        }

        :host /deep/ .null {
            color: magenta;
            font-weight: bold;
        }

        :host /deep/ .key {
            color: #660E7A;
            font-weight: bold;
        }
    `]
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
