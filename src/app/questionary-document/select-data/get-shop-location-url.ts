import { ShopLocation } from '../../thrift-services/ank/gen-model/questionary';
import get from 'lodash-es/get';

export function getShopLocationURL(shopLocation: ShopLocation): string {
    return get(shopLocation, 'url', null);
}
