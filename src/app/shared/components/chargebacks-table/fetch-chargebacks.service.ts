import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import pickBy from 'lodash-es/pickBy';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { booleanDelay } from '@cc/operators/index';

import { ChargebacksParams, createDSL } from '../../../query-dsl';
import { StatChargeback } from '../../../thrift-services/damsel/gen-model/merch_stat';
import { MerchantStatisticsService } from '../../../thrift-services/damsel/merchant-statistics.service';

const SEARCH_LIMIT = 10;

@Injectable()
export class FetchChargebacksService extends PartialFetcher<StatChargeback, ChargebacksParams> {
    isLoading$ = this.doAction$.pipe(booleanDelay(), shareReplay(1));

    constructor(private merchantStatisticsService: MerchantStatisticsService) {
        super();
    }

    protected fetch(
        { from_time, to_time, ...params }: ChargebacksParams,
        continuationToken: string
    ): Observable<FetchResult<StatChargeback>> {
        return this.merchantStatisticsService
            .getChargebacks({
                dsl: createDSL({
                    chargebacks: Object.assign(
                        pickBy(params, (v) => (Array.isArray(v) ? v.length : v)),
                        !!from_time && { from_time: moment(from_time).utc().format() },
                        !!to_time && { to_time: moment(to_time).utc().format() },
                        {
                            size: SEARCH_LIMIT,
                        }
                    ),
                }),
                ...(!!continuationToken && { continuation_token: continuationToken }),
            })
            .pipe(
                map(({ data, continuation_token }) => ({
                    result: data.chargebacks,
                    continuationToken: continuation_token,
                }))
            );
    }
}
