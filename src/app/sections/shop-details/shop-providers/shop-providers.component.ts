import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { race } from 'rxjs';

import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { ProviderID } from '../../../thrift-services/fistful/gen-model/provider';
import {
    EditTerminalDecisionService,
    FetchShopProvidersService,
    RemoveTerminalDecisionService,
} from './services';
import { TerminalActionTypes } from './types';
import { TerminalAction } from './types/terminal-action';

@Component({
    selector: 'cc-shop-providers',
    templateUrl: 'shop-providers.component.html',
    providers: [
        FetchShopProvidersService,
        EditTerminalDecisionService,
        RemoveTerminalDecisionService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopProvidersComponent implements OnInit {
    @Input()
    partyID: PartyID;

    @Input()
    shopID: ShopID;

    providerInfos$ = this.fetchProvidersService.providerInfos$;
    inProgress$ = this.fetchProvidersService.inProgress$;

    constructor(
        private fetchProvidersService: FetchShopProvidersService,
        private editTerminalDecisionService: EditTerminalDecisionService,
        private removeTerminalDecisionService: RemoveTerminalDecisionService
    ) {
        race([
            this.editTerminalDecisionService.terminalChanged$,
            this.removeTerminalDecisionService.removed$,
        ]).subscribe(() => this.getProviders());
    }

    ngOnInit() {
        this.getProviders();
    }

    getProviders() {
        this.fetchProvidersService.getProviderInfos(this.partyID, this.shopID);
    }

    action(action: TerminalAction, providerID: ProviderID) {
        switch (action.type) {
            case TerminalActionTypes.editPriority:
            case TerminalActionTypes.editWeight:
                this.editTerminalDecisionService.edit({ ...action, providerID });
                break;
            case TerminalActionTypes.removeTerminal:
                this.removeTerminalDecisionService.remove({ ...action, providerID });
        }
    }
}
