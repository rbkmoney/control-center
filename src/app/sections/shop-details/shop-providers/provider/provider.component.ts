import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PartyID, ShopID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ProviderInfo } from '../types';
import { TerminalAction } from '../types/terminal-action';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderComponent {
    @Input()
    providerInfo: ProviderInfo;

    @Input()
    partyID: PartyID;

    @Input()
    shopID: ShopID;

    @Output()
    action: EventEmitter<TerminalAction> = new EventEmitter();
}
