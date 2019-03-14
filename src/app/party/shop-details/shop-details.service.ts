import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import get from 'lodash-es/get';

import {
    Contract,
    PayoutTool,
    ProviderObject,
    Shop,
    TerminalObject
} from '../../gen-damsel/domain';
import { extractTerminalInfo, TerminalInfo } from './extract-terminal-info';
import { PartyService } from '../party.service';
import { DomainTypedManager } from '../../thrift';

export interface ProviderInfo {
    provider: ProviderObject;
    terminalInfos: TerminalInfo[];
}

export interface Payload {
    shop: Shop;
    contract: Contract;
    payoutTool: PayoutTool;
    providerInfo: ProviderInfo[];
}

@Injectable()
export class ShopDetailsService {
    constructor(private partyService: PartyService, private dtm: DomainTypedManager) {}

    initialize(partyID: string, shopID: string): Observable<Payload> {
        return combineLatest([
            this.partyService.getShop(partyID, shopID),
            this.dtm.getProviderObjects(),
            this.dtm.getTerminalObjects()
        ]).pipe(
            switchMap(([shop, providers, terminalObjects]) =>
                this.partyService.getContract(partyID, shop.contract_id).pipe(
                    map(contract => ({
                        contract,
                        providerInfo: this.toProviderInfo(
                            providers,
                            terminalObjects,
                            partyID,
                            shopID
                        ),
                        _shop: shop
                    })),
                    switchMap(({ contract, _shop, providerInfo }) =>
                        this.partyService
                            .getPayoutTool(partyID, contract.id, shop.payout_tool_id)
                            .pipe(
                                map(payoutTool => ({
                                    payoutTool,
                                    shop: _shop,
                                    providerInfo,
                                    contract
                                }))
                            )
                    )
                )
            )
        );
    }

    private toProviderInfo(
        providers: ProviderObject[],
        terminalObjects: TerminalObject[],
        partyID: string,
        shopID: string
    ): ProviderInfo[] {
        return providers.reduce((r, provider) => {
            const decisions = get(provider, 'data.terminal.decisions');
            if (!decisions) {
                return r;
            }
            const infos = extractTerminalInfo(decisions, terminalObjects, shopID, partyID);
            if (infos.length === 0) {
                return r;
            }
            return [
                ...r,
                {
                    provider,
                    terminalInfos: infos
                }
            ];
        }, []);
    }
}
