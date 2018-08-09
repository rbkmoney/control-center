import { Component, Input } from '@angular/core';

import { PartyModificationContainer } from '../model';

@Component({
    selector: 'cc-party-modification-container',
    templateUrl: 'party-modification-container.component.html'
})
export class PartyModificationContainerComponent {

    @Input()
    container: PartyModificationContainer;

}
