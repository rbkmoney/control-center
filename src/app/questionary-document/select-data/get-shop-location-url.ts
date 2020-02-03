import { ShopLocation } from '../../thrift-services/ank/gen-model/questionary';

export function getShopLocationURL(shopLocation: ShopLocation): string {
    return shopLocation.url;
}
