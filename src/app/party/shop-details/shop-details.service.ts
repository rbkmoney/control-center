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
        let shop;
        let contract;
        let providerInfo;
        return combineLatest([
            this.partyService.getShop(partyID, shopID),
            this.dtm.getProviderObjects(),
            this.dtm.getTerminalObjects()
        ]).pipe(
            switchMap(([_shop, providers, terminalObjects]) => {
                shop = _shop;
                providerInfo = this.toProviderInfo(providers, terminalObjects, partyID, shopID);
                return this.partyService.getContract(partyID, _shop.contract_id);
            }),
            switchMap(_contract => {
                contract = _contract;
                return this.partyService.getPayoutTool(partyID, _contract.id, shop.payout_tool_id);
            }),
            map(payoutTool => ({
                shop,
                contract,
                payoutTool,
                providerInfo
            }))
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
