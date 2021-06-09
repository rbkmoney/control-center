import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '@cc/app/shared/services';

import { ThriftConnector } from '../../thrift-connector';
import { Country, TradeBloc } from '../gen-model/dominant_cache';
import * as DominantCache from './gen-nodejs/DominantCache';

@Injectable()
export class DominantCacheService extends ThriftConnector {
    constructor(protected keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(keycloakTokenInfoService, DominantCache, '/v1/dominant/cache');
    }

    getTradeBlocs(): Observable<TradeBloc[]> {
        return this.callThriftServiceMethod('GetTradeBlocs');
    }

    getCountries(): Observable<Country[]> {
        return this.callThriftServiceMethod('GetCountries');
    }
}
