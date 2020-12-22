import { Component, Input, OnInit } from '@angular/core';
import { merge, race } from 'rxjs';

import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
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
    inProgress$ = merge(
        this.fetchProvidersService.inProgress$,
        this.removeTerminalDecisionService.inProgress$
    );

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

    action(action: TerminalAction, providerID: number) {
        switch (action.type) {
            case TerminalActionTypes.editPriority:
            case TerminalActionTypes.editWeight:
                this.editTerminalDecisionService.edit({
                    ...action,
                    providerID,
                    partyID: this.partyID,
                    shopID: this.shopID,
                });
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
