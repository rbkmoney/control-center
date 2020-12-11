import { Component, Input, OnInit } from '@angular/core';
import { race } from 'rxjs';

import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { ProviderID } from '../../../thrift-services/fistful/gen-model/provider';
import {
    EditTerminalDecisionService,
    FetchShopProvidersService,
    RemoveTerminalDecisionService,
} from './services';
import { TerminalAction, TerminalActionTypes } from './types';

@Component({
    selector: 'cc-shop-providers',
    templateUrl: 'shop-providers.component.html',
    providers: [
        FetchShopProvidersService,
        EditTerminalDecisionService,
        RemoveTerminalDecisionService,
    ],
})
export class ShopProvidersComponent implements OnInit {
    @Input()
    partyID: PartyID;

    @Input()
    shopID: ShopID;

    providersInfo$ = this.fetchProvidersService.providersInfo$;
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
        this.fetchProvidersService.getProvidersInfo(this.partyID, this.shopID);
    }

    action(action: TerminalAction, providerID: ProviderID) {
        switch (action.type) {
            case TerminalActionTypes.editPriority:
            case TerminalActionTypes.editWeight:
                this.editTerminalDecisionService.edit({ ...action, providerID });
                break;
            case TerminalActionTypes.removeTerminal:
                this.removeTerminalDecisionService.remove({
                    ...action,
                    providerID,
                    partyID: this.partyID,
                    shopID: this.shopID,
                });
                break;
        }
    }
}
