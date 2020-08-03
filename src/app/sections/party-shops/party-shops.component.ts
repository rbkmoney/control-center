import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PartyShopsService } from './party-shops.service';

@Component({
    templateUrl: 'party-shops.component.html',
    providers: [PartyShopsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyShopsComponent {
    shops$ = this.partyShopsService.shops$;
    constructor(private partyShopsService: PartyShopsService) {}
}
