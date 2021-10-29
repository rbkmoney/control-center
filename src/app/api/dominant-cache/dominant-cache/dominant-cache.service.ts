import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import { ThriftConnector } from '../../thrift-connector';
import { dominantCacheInstanceToObject } from '../dominant-cache-thrift-converter';
import {
    CashRegisterProvider,
    Category,
    ContractTemplate,
    Country,
    TradeBloc,
} from '../gen-model/dominant_cache';
import * as DominantCache from './gen-nodejs/DominantCache';

@Injectable({ providedIn: 'root' })
export class DominantCacheService extends ThriftConnector {
    constructor(protected keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(keycloakTokenInfoService, DominantCache, '/v1/dominant/cache');
    }

    getCategories(): Observable<Category[]> {
        return this.callThriftServiceMethod<Category[]>('GetCategories').pipe(
            map((v) =>
                dominantCacheInstanceToObject(
                    'dominant_cache',
                    { name: 'list', valueType: 'Category' },
                    v
                )
            )
        );
    }

    getDocumentTypes(): Observable<DocumentType[]> {
        return this.callThriftServiceMethod<DocumentType[]>('GetDocumentTypes').pipe(
            map((v) =>
                dominantCacheInstanceToObject(
                    'dominant_cache',
                    { name: 'list', valueType: 'DocumentType' },
                    v
                )
            )
        );
    }

    getCashRegisterProviders(): Observable<CashRegisterProvider[]> {
        return this.callThriftServiceMethod<CashRegisterProvider[]>(
            'GetCashRegisterProviders'
        ).pipe(
            map((v) =>
                dominantCacheInstanceToObject(
                    'dominant_cache',
                    { name: 'list', valueType: 'CashRegisterProvider' },
                    v
                )
            )
        );
    }

    getContractTemplates(): Observable<ContractTemplate[]> {
        return this.callThriftServiceMethod<ContractTemplate[]>('GetContractTemplates').pipe(
            map((v) =>
                dominantCacheInstanceToObject(
                    'dominant_cache',
                    { name: 'list', valueType: 'ContractTemplate' },
                    v
                )
            )
        );
    }

    getTradeBlocs(): Observable<TradeBloc[]> {
        return this.callThriftServiceMethod<TradeBloc[]>('GetTradeBlocs').pipe(
            map((v) =>
                dominantCacheInstanceToObject(
                    'dominant_cache',
                    { name: 'list', valueType: 'TradeBloc' },
                    v
                )
            )
        );
    }

    getCountries(): Observable<Country[]> {
        return this.callThriftServiceMethod<Country[]>('GetCountries').pipe(
            map((v) =>
                dominantCacheInstanceToObject(
                    'dominant_cache',
                    { name: 'list', valueType: 'Country' },
                    v
                )
            )
        );
    }
}
