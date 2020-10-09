import get from 'lodash-es/get';

import { ShopLocation } from '../../../../thrift-services/ank/gen-model/questionary';

export function getShopLocationURL(shopLocation: ShopLocation): string {
    return get(shopLocation, 'url', null);
}
