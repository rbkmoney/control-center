import { Injectable } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../papi/party.service';
import { DomainTypedManager } from '../../../thrift-services/damsel';
import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { toProviderInfos } from './to-provider-infos';

@Injectable()
export class FetchShopProvidersService {
    private getProviders$ = new Subject<{ partyID: PartyID; shopID: ShopID }>();

    providers$ = this.getProviders$.pipe(
        switchMap(({ partyID, shopID }) =>
            combineLatest([
                this.partyService.getShop(partyID, shopID),
                this.dtm.getProviderObjects(),
                this.dtm.getTerminalObjects(),
            ]).pipe(
                switchMap(([shop, providers, terminalObjects]) =>
                    this.partyService.getContract(partyID, shop.contract_id).pipe(
                        map((contract) => ({
                            contract,
                            providerInfo: toProviderInfos(
                                providers,
                                terminalObjects,
                                partyID,
                                shopID
                            ),
                            shop,
                        }))
                    )
                ),
                switchMap(({ contract, providerInfo, shop }) =>
                    this.partyService.getPayoutTool(partyID, contract.id, shop.payout_tool_id).pipe(
                        map((payoutTool) => ({
                            payoutTool,
                            shop,
                            providerInfo,
                            contract,
                        }))
                    )
                )
            )
        )
    );

    constructor(private partyService: PartyService, private dtm: DomainTypedManager) {
        this.providers$.subscribe();
    }

    getProviders(partyID: PartyID, shopID: ShopID) {
        this.getProviders$.next({ partyID, shopID });
    }
}
